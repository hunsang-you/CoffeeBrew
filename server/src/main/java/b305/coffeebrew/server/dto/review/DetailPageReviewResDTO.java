package b305.coffeebrew.server.dto.review;

import b305.coffeebrew.server.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@NoArgsConstructor
@Slf4j

public class DetailPageReviewResDTO {
    private Long idx;
    private String nickName;
    private String itemType;
    private Long itemIdx;
    private String content;
    private int overall;
    private int flavor;
    private int acidity;
    private int sweetness;
    private int bitterness;
    private int body;
    private String coffeeing_note;
    private int like;
    private boolean expired;

    public DetailPageReviewResDTO(Review review) {
        this.idx = review.getIdx();
        this.nickName = review.getMemberIdx().getNickname();
        this.itemType = review.getItemType();
        this.itemIdx = review.getItemIdx();
        this.content = review.getContent();
        this.overall = review.getOverall();
        this.flavor = review.getFlavor();
        this.acidity = review.getAcidity();
        this.sweetness = review.getSweetness();
        this.bitterness = review.getBitterness();
        this.body = review.getBody();
        this.coffeeing_note = review.getCoffeeing_note();
        this.like = review.getLike();
        this.expired = review.isExpired();
    }
}
