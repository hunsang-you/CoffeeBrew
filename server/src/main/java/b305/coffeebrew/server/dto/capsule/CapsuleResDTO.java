package b305.coffeebrew.server.dto.capsule;

import b305.coffeebrew.server.entity.Capsule;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleResDTO {

    private Long idx;
    private String nameKo;
    private String nameEn;
    private String summary;
    private String thumbnail;
    private int userGrade;

    @Builder
    public CapsuleResDTO(Long idx, String nameKo, String nameEn, String summary, String thumbnail, int userGrade) {
        this.idx = idx;
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.summary = summary;
        this.thumbnail = thumbnail;
        this.userGrade = userGrade;
    }

    public static CapsuleResDTO of(Capsule capsule) {
        return CapsuleResDTO.builder()
                .idx(capsule.getIdx())
                .nameKo(capsule.getNameKo())
                .nameEn(capsule.getNameEn())
                .summary(capsule.getSummary())
                .thumbnail(capsule.getThumbnail())
                .userGrade(capsule.getUserGrade())
                .build();
    }
}