package b305.coffeebrew.server.config.security.handler;

import b305.coffeebrew.server.config.jwt.JwtTokenProvider;
import b305.coffeebrew.server.config.utils.RedisUtil;
import b305.coffeebrew.server.dto.token.CommonTokenDTO;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

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
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

		log.info("Principal에서 꺼낸 OAuth2User = {} ", oAuth2User);

		log.info("DB 등록 확인");

		// 등록되지 않은 회원일경우 회원가입
		Optional<Member> member = memberRepository.findByMemberEmail((String) oAuth2User.getAttribute("email"));

		String member_id = member.get().getMemberEmail();
		// 만약 해당 이메일로 리프레쉬 토큰이 존재한다면 삭제
		if (redisUtil.getData(member_id) != null) {
			log.info("refresh token exists.Remove refresh token");
			redisUtil.deleteData(member_id);
		}

		// 리프레쉬 토큰 생성 후 Redis에 등록
		CommonTokenDTO token = jwtTokenProvider.generateToken(member_id);
		String refreshtoken = token.getReIssuanceTokenDTO().getRefreshToken();
		redisUtil.setDataExpire(member_id, refreshtoken, jwtTokenProvider.getRefreshValidTime());

		// Response Cookie에 리프레쉬 토큰 적재, access token 생성
		Cookie cookie = jwtTokenProvider.generateCookie(refreshtoken);
		String accesstoken = token.getAccessToken();

		log.info("access_Token = {}", accesstoken);
		log.info("refresh_Token = {}", refreshtoken);
		response.setContentType("application/json;charset=UTF-8");
		// Authorization 헤더필드에 accesstoken 적재 , Set-Cookkie 헤더 필드에 리프레쉬 토큰 cookie 적재
		response.setHeader("Set-Cookie", cookie.toString());
		//redirect main page로.

	}


}
