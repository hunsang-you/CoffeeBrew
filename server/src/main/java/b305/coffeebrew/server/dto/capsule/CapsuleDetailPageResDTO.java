package b305.coffeebrew.server.dto.capsule;

import b305.coffeebrew.server.dto.naverShopping.LinkDTO;
import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.CapsuleDetail;
import b305.coffeebrew.server.entity.CapsuleScore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleDetailPageResDTO {

    private CapsuleResDTO capsule;
    private CapsuleDetailResDTO capsuleDetail;
    private CapsuleScoreResDTO capsuleScore;
    private Set<LinkDTO> linkDTO = new HashSet<>(); // 기본값으로 빈 Set을 할당

    @Builder
    public CapsuleDetailPageResDTO(CapsuleResDTO capsule, CapsuleDetailResDTO capsuleDetail, CapsuleScoreResDTO capsuleScore, Set<LinkDTO> linkDTO) {
        this.capsule = capsule;
        this.capsuleDetail = capsuleDetail;
        this.capsuleScore = capsuleScore;
        this.linkDTO = linkDTO;
    }

    public static CapsuleDetailPageResDTO of(Capsule capsule, CapsuleDetail capsuleDetail, CapsuleScore capsuleScore, Set<LinkDTO> linkDTO) {
        return CapsuleDetailPageResDTO.builder()
                .capsule(CapsuleResDTO.of(capsule))
                .capsuleDetail(CapsuleDetailResDTO.of(capsuleDetail))
                .capsuleScore(CapsuleScoreResDTO.of(capsuleScore))
                .linkDTO(linkDTO)
                .build();
    }
}