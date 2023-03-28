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
@Table(name = "capsule_detail")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleDetail extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "capsule_idx")
    private Capsule capsuleIdx;

    @NotBlank
    private String description; // 설명

    @NotBlank
    private String company; // 제조사

    @NotBlank
    private String origin; // 원산지

    @NotBlank
    @Column(name = "machine_type")
    private String machineType; // 원산지

    @Override
    public void prePersist() {
        super.prePersist();
    }
}
