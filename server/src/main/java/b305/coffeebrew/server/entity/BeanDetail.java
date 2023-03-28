package b305.coffeebrew.server.entity;

import b305.coffeebrew.server.config.utils.BaseAtTime;
import b305.coffeebrew.server.config.utils.BooleanToYNConverter;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "bean_detail")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BeanDetail extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bean_idx")
    private Bean beanIdx;

    @NotBlank
    private String description; // 설명

    @NotBlank
    private String origin; // 생산국

    @NotBlank
    private String region; // 생산지

    @NotBlank
    private String rank; // 등급

    @NotBlank
    private String processing; // 가공

    @NotBlank
    @Convert(converter = BooleanToYNConverter.class)
    private boolean decaffeination; // 원두 가공

    @Override
    public void prePersist() {
        super.prePersist();
    }
}
