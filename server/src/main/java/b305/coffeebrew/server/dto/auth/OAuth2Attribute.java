package b305.coffeebrew.server.dto.auth;

import b305.coffeebrew.server.config.utils.HashCodeGenerator;
import b305.coffeebrew.server.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Builder
@Getter
public class OAuth2Attribute {
    private Map<String,Object> attributes;
    private String attributeKey;
    private Long kakaoId;
    private String email;
    private String name;
    private String ageRange;
    private String gender;
    private String nickname;
    private String picture;
    private String provider;

    public static OAuth2Attribute of(String provider, String attributeKey, Map<String, Object> attributes){
        switch(provider) {
            case "kakao":
                return ofKakao(attributeKey, attributes);
//            case "naver":
//                return ofNaver(attributeKey, attributes);`
            default:
                throw new RuntimeException();
        }
    }

    private static OAuth2Attribute ofKakao(String attributeKey, Map<String,Object> attributes){
        Map<String,Object> kakaoAccount = (Map<String,Object>) attributes.get("kakao_account");
        Map<String,Object> kakaoProfile = (Map<String,Object>) kakaoAccount.get("profile");
        log.debug("{}",kakaoProfile.values());
        return OAuth2Attribute.builder()
                .kakaoId((Long) kakaoProfile.get("id"))
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String) kakaoProfile.get("profile_image_url"))
                .nickname((String) kakaoProfile.get("nickname"))
                .ageRange((String) kakaoAccount.get("age_range"))
                .gender((String) kakaoAccount.get("gender"))
                .attributes(kakaoAccount)
                .attributeKey(attributeKey)
                .provider("KAKAO")
                .build();
    }

//    private static OAuth2Attribute ofNaver(String attributeKey,Map<String,Object> attributes){
//        Map<String,Object> response = (Map<String,Object>) attributes.get("response");
//
//        log.debug("{}",response.values());
//        return OAuth2Attribute.builder()
//                .name((String) response.get("name"))
//                .email((String) response.get("email"))
//                .picture((String) response.get("profile_image"))
//                .nickname((String) response.get("nickname"))
//                .attributes(response)
//                .attributeKey(attributeKey)
//                .provider("NAVER")
//                .build();
//    }

    public Member toEntity() {
        return Member.builder()
                .nickname(name)
                .memberEmail(email)
                .profileImg(picture)
                .role("ROLE_MEMBER")
                .snsType(provider)
                .gender(gender)
                .ageRange(ageRange)
                .hashcode(HashCodeGenerator.generate())
                .build();
    }

}
