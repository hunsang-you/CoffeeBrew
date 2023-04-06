package b305.coffeebrew.server.dto.capsule;

import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.CapsuleScore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleSearchResDTO {

    private Long idx;
    private String nameKo;
    private String nameEn;
    private String summary;
    private String thumbnail;
    private int userGrade;
    private String taste;

    @Builder
    public CapsuleSearchResDTO(Long idx, String nameKo, String nameEn, String summary, String thumbnail, int userGrade, String taste) {
        this.idx = idx;
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.summary = summary;
        this.thumbnail = thumbnail;
        this.userGrade = userGrade;
        this.taste = taste;
    }

    public static CapsuleSearchResDTO of(Capsule capsule, CapsuleScore capsuleScore) {
        String taste = null;
        int maxScore = Integer.MIN_VALUE;
        if (capsuleScore != null) {
            int[] scores = {capsuleScore.getBitterness(), capsuleScore.getAcidity(), capsuleScore.getBalance(), capsuleScore.getBody(), capsuleScore.getSweetness()};
            String[] scoreNames = {"sweetness", "acidity", "bitterness", "balance", "body"};
            for (int i = 0; i < scores.length; i++) {
                if (scores[i] > maxScore) {
                    maxScore = scores[i];
                    taste = scoreNames[i];
                }
            }
        }

        return CapsuleSearchResDTO.builder()
                .idx(capsule.getIdx())
                .nameKo(capsule.getNameKo())
                .nameEn(capsule.getNameEn())
                .summary(capsule.getSummary())
                .thumbnail(capsule.getThumbnail())
                .userGrade(capsule.getUserGrade())
                .taste(taste)
                .build();
    }
}