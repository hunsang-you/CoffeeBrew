package b305.coffeebrew.server.dto.capsule;

import b305.coffeebrew.server.entity.CapsuleDetail;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleDetailResDTO {
    private Long idx;
    private CapsuleResDTO capsule;
    private String description; // 설명
    private String company; // 제조사
    private String origin; // 원산지
    private String machineType; // 원산지

    @Builder
    public CapsuleDetailResDTO(Long idx, CapsuleResDTO capsule, String description, String company, String origin, String machineType) {
        this.idx = idx;
        this.capsule = capsule;
        this.description = description;
        this.company = company;
        this.origin = origin;
        this.machineType = machineType;
    }

    public static CapsuleDetailResDTO of(CapsuleDetail capsuleDetail) {
        return CapsuleDetailResDTO.builder()
                .idx(capsuleDetail.getIdx())
                .capsule(CapsuleResDTO.of(capsuleDetail.getCapsuleIdx()))
                .description(capsuleDetail.getDescription())
                .company(capsuleDetail.getCompany())
                .origin(capsuleDetail.getOrigin())
                .machineType(capsuleDetail.getMachineType())
                .build();
    }
}