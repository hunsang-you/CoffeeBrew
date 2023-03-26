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
@Table(name = "shop_history")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShopHistory extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 회원 식별
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member memberIdx;

    @NotBlank
    @Column(name="shop_title")
    private String shopTitle;

    @NotBlank
    @Column(name="shop_url")
    private String shopUrl;

    @NotBlank
    private String item_type;

    @Convert(converter = BooleanToYNConverter.class)
    @NotBlank
    private boolean expired;

    @NotBlank
    private Long item_idx;
    @Override
    public void prePersist() {
        super.prePersist();
    }
}