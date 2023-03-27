package b305.coffeebrew.server.dto.capsule;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleDetailPageResDTO {

    private String name_ko;
    private String name_en;
    private String summary;
    private String thumbnail;
    private int user_grade;
    private String description;
    private String company;
    private String origin;
    private String machine_type;
    private int overall;
    private int intensity; // 얜 강도네? 원두는 향미던데
    private int acidity;
    private int bitterness;
    private int body;
    private int roasting; // int 맞아?
    private String coffeeingNote;

    @Builder
    public CapsuleDetailPageResDTO(String name_ko, String name_en, String summary, String thumbnail, int user_grade, String description, String company, String origin, String machine_type, int overall, int intensity, int acidity, int bitterness, int body, int roasting, String coffeeingNote) {
        this.name_ko = name_ko;
        this.name_en = name_en;
        this.summary = summary;
        this.thumbnail = thumbnail;
        this.user_grade = user_grade;
        this.description = description;
        this.company = company;
        this.origin = origin;
        this.machine_type = machine_type;
        this.overall = overall;
        this.intensity = intensity;
        this.acidity = acidity;
        this.bitterness = bitterness;
        this.body = body;
        this.roasting = roasting;
        this.coffeeingNote = coffeeingNote;
    }

    public static CapsuleDetailPageResDTO of(String name_ko, String name_en, String summary, String thumbnail, int user_grade, String description, String company, String origin, String machine_type, int overall, int intensity, int acidity, int bitterness, int body, int roasting, String coffeeingNote) {
        return CapsuleDetailPageResDTO.builder()
                .name_ko(name_ko)
                .name_en(name_en)
                .summary(summary)
                .thumbnail(thumbnail)
                .user_grade(user_grade)
                .description(description)
                .company(company)
                .origin(origin)
                .machine_type(machine_type)
                .overall(overall)
                .intensity(intensity)
                .acidity(acidity)
                .bitterness(bitterness)
                .body(body)
                .roasting(roasting)
                .coffeeingNote(coffeeingNote)
                .build();
    }
}