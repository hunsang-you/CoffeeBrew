package b305.coffeebrew.server.entity;

import b305.coffeebrew.server.config.utils.BaseAtTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "capsule")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Capsule extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @NotBlank
    @Column(name = "name_ko")
    private String nameKo; // 캡슐 한글 이름

    @NotBlank
    @Column(name = "name_en")
    private String nameEn; // 캡슐 영어 이름

    @NotBlank
    private String summary; // 캡슐 요약

    @NotBlank
    private String thumbnail; // 캡슐 썸네일

    @NotNull
    @Column(name = "user_grade")
    private int userGrade; // 사용자 평점

    @Override
    public void prePersist() {
        super.prePersist();
    }
}
