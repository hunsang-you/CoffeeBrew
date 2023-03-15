package b305.coffeebrew.server.entity;

import b305.coffeebrew.server.config.utils.BaseAtTime;
import b305.coffeebrew.server.config.utils.BooleanToYNConverter;
import b305.coffeebrew.server.dto.member.SignModReqDTO;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "member")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseAtTime implements Serializable {

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
    private int age; // 사용자 nickname

    @ColumnDefault("'ROLE_MEMBER'")
    private String role;

    @Convert(converter = BooleanToYNConverter.class)
    @NotBlank
    private boolean expired;

    @Override
    public void prePersist() {
        super.prePersist();
        this.role = "ROLE_MEMBER";
    }

    public void update(SignModReqDTO signModReqDTO) {
        this.profileImg = signModReqDTO.getProfileImg();
        this.nickname = signModReqDTO.getNickname();
    }
}