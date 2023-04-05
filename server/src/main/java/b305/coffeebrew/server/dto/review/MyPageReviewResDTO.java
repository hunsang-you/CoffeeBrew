package b305.coffeebrew.server.dto.review;

import b305.coffeebrew.server.dto.bean.BeanResDTO;
import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Review;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Getter
@Setter
@Slf4j
@NoArgsConstructor
public class MyPageReviewResDTO {
	private Long member_idx;
	private String itemName;
	private String itemType;
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
	public MyPageReviewResDTO(Long member_idx, String itemName,String itemType, String content, int overall, int flavor, int acidity, int sweetness, int bitterness, int body, String coffeeing_note, int like, boolean expired,LocalDateTime createdDate, LocalDateTime updatedDate) {
		this.member_idx = member_idx;
		this.itemName = itemName;
		this.itemType = itemType;
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
	public static MyPageReviewResDTO of(Review review, String itemName){
		return MyPageReviewResDTO.builder()
				.member_idx(review.getMemberIdx().getIdx())
				.itemName(itemName)
				.itemType(review.getItemType())
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
