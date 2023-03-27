package b305.coffeebrew.server.dto.bean;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BeanDetailPageResDTO {

    private String name_ko;
    private String name_en;
    private String summary;
    private String thumbnail;
    private int user_grade;
    private String description;
    private String origin;
    private String region;
    private String rank;
    private String processing;
    private String decaffeination;
    private int overall;
    private int flavor;
    private int acidity;
    private int sweetness;
    private int bitterness;
    private int body;
    private String coffeeingNote;

    @Builder
    public BeanDetailPageResDTO(String name_ko, String name_en, String summary, String thumbnail, int user_grade, String description, String origin, String region, String rank, String processing, String decaffeination, int overall, int flavor, int acidity, int sweetness, int bitterness, int body, String coffeeingNote) {
        this.name_ko = name_ko;
        this.name_en = name_en;
        this.summary = summary;
        this.thumbnail = thumbnail;
        this.user_grade = user_grade;
        this.description = description;
        this.origin = origin;
        this.region = region;
        this.rank = rank;
        this.processing = processing;
        this.decaffeination = decaffeination;
        this.overall = overall;
        this.flavor = flavor;
        this.acidity = acidity;
        this.sweetness = sweetness;
        this.bitterness = bitterness;
        this.body = body;
        this.coffeeingNote = coffeeingNote;
    }

    public static BeanDetailPageResDTO of(String name_ko, String name_en, String summary, String thumbnail, int user_grade, String description, String origin, String region, String rank, String processing, String decaffeination, int overall, int flavor, int acidity, int sweetness, int bitterness, int body, String coffeeingNote) {
        return BeanDetailPageResDTO.builder()
                .name_ko(name_ko)
                .name_en(name_en)
                .summary(summary)
                .thumbnail(thumbnail)
                .user_grade(user_grade)
                .description(description)
                .origin(origin)
                .region(region)
                .rank(rank)
                .processing(processing)
                .decaffeination(decaffeination)
                .overall(overall)
                .flavor(flavor)
                .acidity(acidity)
                .sweetness(sweetness)
                .bitterness(bitterness)
                .body(body)
                .coffeeingNote(coffeeingNote)
                .build();
    }
}