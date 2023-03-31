package b305.coffeebrew.server.dto.capsule;

import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.CapsuleDetail;
import b305.coffeebrew.server.entity.CapsuleScore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleDetailPageResDTO {

    private CapsuleResDTO capsule;
    private CapsuleDetailResDTO capsuleDetail;
    private CapsuleScoreResDTO capsuleScore;

    @Builder
    public CapsuleDetailPageResDTO(CapsuleResDTO capsule, CapsuleDetailResDTO capsuleDetail, CapsuleScoreResDTO capsuleScore) {
        this.capsule = capsule;
        this.capsuleDetail = capsuleDetail;
        this.capsuleScore = capsuleScore;
    }

    public static CapsuleDetailPageResDTO of(Capsule capsule, CapsuleDetail capsuleDetail, CapsuleScore capsuleScore) {
        return CapsuleDetailPageResDTO.builder()
                .capsule(CapsuleResDTO.of(capsule))
                .capsuleDetail(CapsuleDetailResDTO.of(capsuleDetail))
                .capsuleScore(CapsuleScoreResDTO.of(capsuleScore))
                .build();
    }
}