package b305.coffeebrew.server.config.security.handler;

import b305.coffeebrew.server.config.jwt.JwtTokenProvider;
import b305.coffeebrew.server.config.utils.RedisUtil;
import b305.coffeebrew.server.dto.token.CommonTokenDTO;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final RedisUtil redisUtil;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		log.info("Principal에서 꺼낸 OAuth2User = {}", oAuth2User);

		log.info("DB 등록 확인");

		String userEmail = (String) oAuth2User.getAttribute("email");
		Optional<Member> member = memberRepository.findByMemberEmail(userEmail);

		// 등록되지 않은 회원일 경우 회원가입
		if (member.isEmpty()) {
			// 회원가입 로직 구현
		} else {
			String memberId = member.get().getMemberEmail();

			// 만약 해당 이메일로 리프레시 토큰이 존재한다면 삭제
			if (redisUtil.getData(memberId) != null) {
				log.info("refresh token exists. Remove refresh token");
				redisUtil.deleteData(memberId);
			}

			// 리프레시 토큰 생성 후 Redis에 등록
			CommonTokenDTO token = jwtTokenProvider.generateToken(memberId);
			String refreshToken = token.getReIssuanceTokenDTO().getRefreshToken();
			redisUtil.setDataExpire(memberId, refreshToken, jwtTokenProvider.getRefreshValidTime());

			// Response Cookie에 리프레시 토큰 적재, access token 생성
			Cookie cookie = jwtTokenProvider.generateCookie(refreshToken);
			String accessToken = token.getAccessToken();

			log.info("access_Token = {}", accessToken);
			log.info("refresh_Token = {}", refreshToken);

			// Authorization 헤더 필드에 accesstoken 적재, Set-Cookie 헤더 필드에 리프레시 토큰 cookie 적재
			response.setHeader("Authorization", "Bearer " + accessToken);
			response.addCookie(cookie);

			// Add this line to check if the token is actually included in the response header
			log.info("Response headers: {}", response.getHeaderNames());

			// redirect 방식으로 /api 로 보냅니다.
			String url = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect/"+accessToken)
					.build().toUriString();
			log.info("Url: {}", url);
			getRedirectStrategy().sendRedirect(request, response, url);
		}
	}
}