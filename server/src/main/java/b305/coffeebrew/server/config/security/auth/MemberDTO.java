package b305.coffeebrew.server.config.security.auth;

import b305.coffeebrew.server.config.utils.BooleanToYNConverter;
import b305.coffeebrew.server.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Optional;

@Setter
@Getter
@NoArgsConstructor
public class MemberDTO {

    // 사용자 Idx
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @NotBlank
    @Column(name = "member_id", unique = true)
    private String memberId; // 사용자 ID

    @NotBlank
    @Column(name = "sns_type")
    private String snsType; // 사용자 sns 종류

    private String profileImg; // 프사

    @NotBlank
    private String nickname; // 사용자 nickname

    private String gender; // 사용자 nickname
    private String ageRange; // 사용자 nickname

    @ColumnDefault("'ROLE_MEMBER'")
    private String role;

    @Convert(converter = BooleanToYNConverter.class)
    @NotBlank
    private boolean expired;

    @Builder
    public MemberDTO(Long idx, String memberId, String snsType, String profileImg, String nickname, String gender, String ageRange, String role, boolean expired) {
        this.idx = idx;
        this.memberId = memberId;
        this.snsType = snsType;
        this.profileImg = profileImg;
        this.nickname = nickname;
        this.gender = gender;
        this.ageRange = ageRange;
        this.role = role;
        this.expired = expired;
    }




    public MemberDTO of(Optional<Member> member) {
        return MemberDTO.builder()
                .idx(member.get().getIdx())
                .build();
    }
}
