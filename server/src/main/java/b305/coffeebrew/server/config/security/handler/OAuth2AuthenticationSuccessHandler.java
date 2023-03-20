package b305.coffeebrew.server.config.security.handler;

import b305.coffeebrew.server.config.utils.RedisUtil;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final RedisUtil redisUtil;
	private final MemberRepository memberRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
										Authentication authentication) throws IOException, ServletException {
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

		log.info("Principal에서 꺼낸 OAuth2User = {} ", oAuth2User);
		log.info("DB 등록 확인");

		// 등록되지 않은 회원일경우 회원가입
		Member member = memberRepository.findByMemberEmail((String) oAuth2User.getAttribute("email"));
		if (oAuth2User != null && member == null) {
			Member memberData = createMember(oAuth2User);
			if(memberData == null) {
				log.info("회원 가입 실패");
			} else {
				log.info("유저를 찾을 수 없습니다. 유저 정보를 등록합니다.");
			}
		}

	}

	// 회원 가입시 회원 테이블 생성 (미완성)
	public Member createMember(OAuth2User oAuth2User) {
		return memberRepository.saveAndFlush(Member.builder()
				.memberEmail((String) oAuth2User.getAttribute("email"))
				.snsType(oAuth2User.getAttribute("provider"))
				.role("ROLE_MEMBER")
				.build());
	}
}