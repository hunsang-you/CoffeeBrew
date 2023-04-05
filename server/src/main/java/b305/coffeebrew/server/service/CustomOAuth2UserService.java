package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.auth.OAuth2Attribute;
import b305.coffeebrew.server.dto.member.SignModReqDTO;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // OAuth2Service 객체 생성
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        // userRequest에 있는 access Token으로 정보 얻기
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        // registrationId: 현재 로그인 진행 중인 서비스를 구분하는 코드(네이버, 카카오... 로그인인지 구분하기 위해 사용)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // userNameAttributeName: Oauth2 로그인 진행시 키가 되는 필드 값(Primary key와 비슷)
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        log.debug("registrationId = {}", registrationId);

        // naver는 response, kakao는 kakao_account 안에 필요한 정보가 들어가 있으니 해당 내용을 application-oauth.yml에 미리 설정해둠
        log.debug("userNameAttributeName = {}", userNameAttributeName);

        // OAuth2UserService를 통해 가져온 OAuth2User 값들로 oAuth2Attribute 객체 생성 ( oAuth2User.getAttributes() 에는 반환받은 JSON 값이 들어가있음 )
        OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        log.debug("oAuth2User = {}", oAuth2User.getName());
        // 만들어진 객체를 map 형식으로 변환 후 OAuth2User 기본객체인 DefaultOAuth2User 생성후 리턴 ( 권한, 유저 데이터, nameAttributeKey ( 사용자 식별을 하기위한 키 ))
        Member member = saveOrUpdate(oAuth2Attribute, oAuth2User.getName());
        log.debug("getAttributes = {}", oAuth2Attribute.getAttributes());
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRole())),
                oAuth2Attribute.getAttributes(), "email");
    }

    private Member saveOrUpdate(OAuth2Attribute attributes, String kakaoId) {
        Member member = memberRepository.findByMemberEmailAndExpiredIsFalse(attributes.getEmail())
                .map(entity -> entity.update(new SignModReqDTO(attributes.getName(), attributes.getPicture(), Long.parseLong(kakaoId))))
                .orElse(attributes.toEntity());
        member.setExpired(false);
        return memberRepository.save(member);
    }
}
