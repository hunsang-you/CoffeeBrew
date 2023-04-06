package b305.coffeebrew.server.dto.bean;

import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.BeanScore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BeanSearchResDTO {

    private Long idx;
    private String nameKo;
    private String nameEn;
    private String summary;
    private String thumbnail;
    private int userGrade;
    private String taste;

    @Builder
    public BeanSearchResDTO(Long idx, String nameKo, String nameEn, String summary, String thumbnail, int userGrade, String taste) {
        this.idx = idx;
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.summary = summary;
        this.thumbnail = thumbnail;
        this.userGrade = userGrade;
        this.taste = taste;
    }

    public static BeanSearchResDTO of(Bean bean, BeanScore beanScore) {
        String taste = "";
        int maxScore = Integer.MIN_VALUE;
        if (beanScore != null) {
            int[] scores = {beanScore.getBitterness(), beanScore.getAcidity(), beanScore.getBalance(), beanScore.getBody(), beanScore.getSweetness()};
            String[] scoreNames = {"sweetness", "acidity", "bitterness", "balance", "body"};
            for (int i = 0; i < scores.length; i++) {
                if (scores[i] > maxScore) { // 같은 점수가 있을 경우에도 포함하도록 >=로 수정
                    maxScore = scores[i];
                    taste = scoreNames[i];
                }
            }
        }

        return BeanSearchResDTO.builder()
                .idx(bean.getIdx())
                .nameKo(bean.getNameKo())
                .nameEn(bean.getNameEn())
                .summary(bean.getSummary())
                .thumbnail(bean.getThumbnail())
                .userGrade(bean.getUserGrade())
                .taste(taste)
                .build();
    }
}