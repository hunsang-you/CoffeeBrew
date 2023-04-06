package b305.coffeebrew.server.dto.capsule;

import b305.coffeebrew.server.entity.CapsuleScore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleScoreResDTO {

    private Long idx;
    private CapsuleResDTO capsule;
    private int balance; // 밸런스
    private int flavor; // intensity -> flavor
    private int acidity; // 산미
    private int bitterness; // 쓴맛
    private int sweetness; // 단맛
    private int body; // 바디감
    private int roasting; // 로스팅. 근데 int 맞냐?
    private String coffeeingNote; // 맛 상세

    @Builder
    public CapsuleScoreResDTO(Long idx, CapsuleResDTO capsule, int balance, int flavor, int acidity, int bitterness, int sweetness, int body, int roasting, String coffeeingNote) {
        this.idx = idx;
        this.capsule = capsule;
        this.balance = balance;
        this.flavor = flavor;
        this.acidity = acidity;
        this.bitterness = bitterness;
        this.sweetness = sweetness;
        this.body = body;
        this.roasting = roasting;
        this.coffeeingNote = coffeeingNote;
    }

    public static CapsuleScoreResDTO of(CapsuleScore capsuleScore) {
        return CapsuleScoreResDTO.builder()
                .idx(capsuleScore.getIdx())
                .capsule(CapsuleResDTO.of(capsuleScore.getCapsuleIdx()))
                .balance(capsuleScore.getBalance())
                .flavor(capsuleScore.getFlavor())
                .acidity(capsuleScore.getAcidity())
                .bitterness(capsuleScore.getBitterness())
                .sweetness(capsuleScore.getSweetness())
                .body(capsuleScore.getBody())
                .roasting(capsuleScore.getRoasting())
                .coffeeingNote(capsuleScore.getCoffeeingNote())
                .build();
    }
}