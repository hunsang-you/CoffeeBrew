package b305.coffeebrew.server.dto.bean;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BeanDetailPageResDTO {

	private String nameKo;
	private String nameEn;
	private String summary;
	private String thumbnail;
	private int userGrade;
	private String description;
	private String origin;
	private String region;
	private String rank;
	private String processing;
	private boolean decaffeination;
	private int balance;
	private int flavor;
	private int acidity;
	private int sweetness;
	private int bitterness;
	private int body;
	private String coffeeingNote;
	private String roastingPoint;
	@Builder
	public BeanDetailPageResDTO(String nameKo, String nameEn, String summary, String thumbnail, int userGrade, String description, String origin, String region, String rank, String processing, boolean decaffeination, int balance, int flavor, int acidity, int sweetness, int bitterness, int body, String coffeeingNote, String roastingPoint) {
		this.nameKo = nameKo;
		this.nameEn = nameEn;
		this.summary = summary;
		this.thumbnail = thumbnail;
		this.userGrade = userGrade;
		this.description = description;
		this.origin = origin;
		this.region = region;
		this.rank = rank;
		this.processing = processing;
		this.decaffeination = decaffeination;
		this.balance = balance;
		this.flavor = flavor;
		this.acidity = acidity;
		this.sweetness = sweetness;
		this.bitterness = bitterness;
		this.body = body;
		this.coffeeingNote = coffeeingNote;
		this.roastingPoint = roastingPoint;
	}



	public static BeanDetailPageResDTO of(String nameKo, String nameEn, String summary, String thumbnail, int userGrade, String description, String origin, String region, String rank, String processing, boolean decaffeination, int balance, int flavor, int acidity, int sweetness, int bitterness, int body, String coffeeingNote, String roastingPoint) {
		return BeanDetailPageResDTO.builder()
				.nameKo(nameKo)
				.nameEn(nameEn)
				.summary(summary)
				.thumbnail(thumbnail)
				.userGrade(userGrade)
				.description(description)
				.origin(origin)
				.region(region)
				.rank(rank)
				.processing(processing)
				.decaffeination(decaffeination)
				.balance(balance)
				.flavor(flavor)
				.acidity(acidity)
				.sweetness(sweetness)
				.bitterness(bitterness)
				.body(body)
				.coffeeingNote(coffeeingNote)
				.roastingPoint(roastingPoint)
				.build();
	}
}