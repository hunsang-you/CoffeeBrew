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
@Table(name = "likelist")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Likelist extends BaseAtTime implements Serializable {

    // 사용자 Idx
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 등록자 IDX
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member member;// 사용자

    @NotBlank
    @Column(name = "item_type")
    private String itemType; // none / bean / capsule

    @NotBlank
    @Column(name = "item_idx")
    private Long itemIdx;

    @Convert(converter = BooleanToYNConverter.class)
    @NotBlank
    private boolean expired;

    @Override
    public void prePersist() {
        super.prePersist();
    }
}
