package b305.coffeebrew.server.dto.member;

import b305.coffeebrew.server.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
public class ProfileResDTO {

    private String profileImg;
    private String memberEmail;
    private String nickname;
    private String hashcode;
    private String snsType;

    public ProfileResDTO(String profileImg, String memberEmail, String nickname, String hashcode, String snsType) {
        this.profileImg = profileImg;
        this.memberEmail = memberEmail;
        this.nickname = nickname;
        this.hashcode = hashcode;
        this.snsType = snsType;
    }

    public static ProfileResDTO of(Member member) {
        return ProfileResDTO.builder()
                .profileImg(member.getProfileImg())
                .memberEmail(member.getMemberEmail())
                .nickname(member.getNickname())
                .hashcode(member.getHashcode())
                .snsType(member.getSnsType())
                .build();
    }

}
