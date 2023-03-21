package b305.coffeebrew.server.entity;

import b305.coffeebrew.server.config.utils.BaseAtTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "bean_score")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BeanScore extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @NotBlank
    private String description; // 설명

    @NotBlank
    private String species; // 원두 원종

    @NotBlank
    private String origin; // 원산지

    @NotBlank
    private String processing; // 원두 가공

    @Override
    public void prePersist() {
        super.prePersist();
    }
}