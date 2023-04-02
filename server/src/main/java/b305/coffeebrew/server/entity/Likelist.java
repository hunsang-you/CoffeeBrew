package b305.coffeebrew.server.entity;

import b305.coffeebrew.server.config.utils.BaseAtTime;
import b305.coffeebrew.server.config.utils.BooleanToYNConverter;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member member;

    @NotBlank
    @Column(name = "item_type")
    private String itemType; // none / bean / capsule

    @NotNull
    @Column(name = "item_idx")
    private Long itemIdx;

    @Convert(converter = BooleanToYNConverter.class)
    private boolean expired;

    @Override
    public void prePersist() {
        super.prePersist();
    }
}
