package b305.coffeebrew.server.entity;

import b305.coffeebrew.server.config.utils.BaseAtTime;
import b305.coffeebrew.server.config.utils.BooleanToYNConverter;
import b305.coffeebrew.server.dto.review.ReviewPageDTO;
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
@Table(name = "review")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 회원 식별
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member memberIdx;

    @NotBlank
    private String itemType;

    @NotNull
    private Long itemIdx;

    private String content;

    @NotNull
    private int overall; // 총점
    
    @NotNull
    private int flavor; // 향미

    @NotNull
    private int acidity; // 산미

    @NotNull
    private int sweetness; // 단맛
    @NotNull
    private int bitterness; // 쓴맛

    @NotNull
    private int body; // 바디감


    @NotBlank
    private String coffeeing_note; // 커핑노트(향 상세)

    @NotNull
    private int like; // 좋아요 수치

    @Convert(converter = BooleanToYNConverter.class)
    private boolean expired;

    @Override
    public void prePersist() {
        super.prePersist();
    }

    public void update(ReviewPageDTO reviewPageDTO){
        this.content = reviewPageDTO.getContent();
        this.overall = reviewPageDTO.getOverall();
        this.flavor = reviewPageDTO.getFlavor();
        this.acidity = reviewPageDTO.getAcidity();
        this.sweetness = reviewPageDTO.getSweetness();
        this.bitterness = reviewPageDTO.getBitterness();
        this.body = reviewPageDTO.getBody();
        this.coffeeing_note = reviewPageDTO.getCoffeeing_note();
        this.like = reviewPageDTO.getLike();
    }
}
