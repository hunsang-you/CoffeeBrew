package b305.coffeebrew.server.dto.review;

import b305.coffeebrew.server.config.utils.BooleanToYNConverter;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Review;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Convert;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@Slf4j

public class ReviewPageDTO {
    private Long member_idx;
    private String item_type;
    private Long item_idx;
    private String title;
    private String content;
    private int overall; // 총점
    private int flavor; // 맛
    private int acidity; // 산미
    private int sweetness; // 향
    private int bitterness; // 밸런스
    private int body; // 바디감
    private String coffeeing_note; // 향 상세
    private int like; // 좋아요

    private boolean expired;

    @Builder
    public ReviewPageDTO(Long member_idx, String item_type, Long item_idx, String title, String content, int overall, int flavor, int acidity, int sweetness, int bitterness, int body, String coffeeing_note, int like, boolean expired) {
        this.member_idx = member_idx;
        this.item_type = item_type;
        this.item_idx = item_idx;
        this.title = title;
        this.content = content;
        this.overall = overall;
        this.flavor = flavor;
        this.acidity = acidity;
        this.sweetness = sweetness;
        this.bitterness = bitterness;
        this.body = body;
        this.coffeeing_note = coffeeing_note;
        this.like = like;
        this.expired = expired;
    }
    public Review of(Member member){
        return Review.builder().memberIdx(member)
                .item_type(this.item_type)
                .item_idx(this.item_idx)
                .title(this.title)
                .content(this.content)
                .overall(this.overall)
                .flavor(this.flavor)
                .acidity(this.acidity)
                .sweetness(this.sweetness)
                .bitterness(this.bitterness)
                .body(this.body)
                .coffeeing_note(this.coffeeing_note)
                .like(0).expired(false).build();
    }
}
