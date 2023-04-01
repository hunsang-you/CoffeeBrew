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
@Table(name = "bean")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bean extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @NotBlank
    @Column(name = "name_ko")
    private String nameKo; // 원두 한글 이름

    @NotBlank
    @Column(name = "name_en")
    private String nameEn; // 원두 영어 이름

    @NotBlank
    private String summary; // 원두 요약

    @NotBlank
    private String thumbnail; // 원두 썸네일

    @NotNull
    @Column(name = "user_grade")
    private int userGrade; // 사용자 평점

    @Override
    public void prePersist() {
        super.prePersist();
    }
}
