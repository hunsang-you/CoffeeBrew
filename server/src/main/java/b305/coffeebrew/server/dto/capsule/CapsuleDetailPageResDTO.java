package b305.coffeebrew.server.dto.capsule;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleDetailPageResDTO {

    private String nameKo;
    private String nameEn;
    private String summary;
    private String thumbnail;
    private int userGrade;
    private String description;
    private String company;
    private String origin;
    private String machineType;
    private int balance;
    private int flavor; // 얜 강도네? 원두는 향미던데
    private int acidity;
    private int bitterness;
    private int body;
    private int roasting; // int 맞아?
    private String coffeeingNote;

    public CapsuleDetailPageResDTO(String nameKo, String nameEn, String summary, String thumbnail, int userGrade, String description, String company, String origin, String machineType, int balance, int flavor, int acidity, int bitterness, int body, int roasting, String coffeeingNote) {
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.summary = summary;
        this.thumbnail = thumbnail;
        this.userGrade = userGrade;
        this.description = description;
        this.company = company;
        this.origin = origin;
        this.machineType = machineType;
        this.balance = balance;
        this.flavor = flavor;
        this.acidity = acidity;
        this.bitterness = bitterness;
        this.body = body;
        this.roasting = roasting;
        this.coffeeingNote = coffeeingNote;
    }

    @Builder


    public static CapsuleDetailPageResDTO of(String nameKo, String nameEn, String summary, String thumbnail, int userGrade, String description, String company, String origin, String machineType, int balance, int flavor, int acidity, int bitterness, int body, int roasting, String coffeeingNote) {
        return CapsuleDetailPageResDTO.builder()
                .nameKo(nameKo)
                .nameEn(nameEn)
                .summary(summary)
                .thumbnail(thumbnail)
                .userGrade(userGrade)
                .description(description)
                .company(company)
                .origin(origin)
                .machineType(machineType)
                .balance(balance)
                .flavor(flavor)
                .acidity(acidity)
                .bitterness(bitterness)
                .body(body)
                .roasting(roasting)
                .coffeeingNote(coffeeingNote)
                .build();
    }
}