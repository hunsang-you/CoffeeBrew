package b305.coffeebrew.server.dto.review;

import b305.coffeebrew.server.dto.member.ProfileResDTO;
import b305.coffeebrew.server.entity.Review;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReviewResDTO {

    private Long idx;
    private ProfileResDTO profile;
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
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @Builder
    public ReviewResDTO(Long idx, ProfileResDTO profile, String itemType, Long itemIdx, String content, int overall, int flavor, int acidity, int sweetness, int bitterness, int body, String coffeeing_note, int like, boolean expired, LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.idx = idx;
        this.profile = profile;
        this.itemType = itemType;
        this.itemIdx = itemIdx;
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
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public static ReviewResDTO of(Review review) {
        return ReviewResDTO.builder()
                .idx(review.getIdx())
                .profile(new ProfileResDTO(
                        review.getMemberIdx().getProfileImg(),
                        review.getMemberIdx().getMemberEmail(),
                        review.getMemberIdx().getNickname(),
                        review.getMemberIdx().getHashcode(),
                        review.getMemberIdx().getSnsType()))
                .itemType(review.getItemType())
                .itemIdx(review.getItemIdx())
                .content(review.getContent())
                .overall(review.getOverall())
                .flavor(review.getFlavor())
                .acidity(review.getAcidity())
                .sweetness(review.getSweetness())
                .bitterness(review.getBitterness())
                .body(review.getBody())
                .coffeeing_note(review.getCoffeeing_note())
                .like(review.getLike())
                .expired(review.isExpired())
                .createdDate(review.getCreatedDate())
                .updatedDate(review.getUpdatedDate())
                .build();
    }
}