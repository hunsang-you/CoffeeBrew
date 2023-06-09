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
@Table(name = "capsule_score")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleScore extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "capsule_idx")
    private Capsule capsuleIdx;

    @NotNull
    private int balance; // 밸런스

    @NotNull
    private int flavor; // intensity -> flavor

    @NotNull
    private int acidity; // 산미
    
    @NotNull
    private int sweetness; // 단맛

    @NotNull
    private int bitterness; // 쓴맛

    @NotNull
    private int body; // 바디감

    @NotNull
    private int roasting; // 로스팅. 근데 int 맞냐?

    @NotBlank
    @Column(name = "coffeeing_note")
    private String coffeeingNote; // 맛 상세

    @Override
    public void prePersist() {
        super.prePersist();
    }
}