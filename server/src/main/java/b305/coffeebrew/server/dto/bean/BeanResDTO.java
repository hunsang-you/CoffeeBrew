package b305.coffeebrew.server.dto.bean;

import b305.coffeebrew.server.entity.Bean;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BeanResDTO {

    private Long idx;
    private String nameKo;
    private String nameEn;
    private String summary;
    private String thumbnail;
    private int userGrade;

    @Builder
    public BeanResDTO(Long idx, String nameKo, String nameEn, String summary, String thumbnail, int userGrade) {
        this.idx = idx;
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.summary = summary;
        this.thumbnail = thumbnail;
        this.userGrade = userGrade;
    }

    public static BeanResDTO of(Bean bean) {
        return BeanResDTO.builder()
                .idx(bean.getIdx())
                .nameKo(bean.getNameKo())
                .nameEn(bean.getNameEn())
                .summary(bean.getSummary())
                .thumbnail(bean.getThumbnail())
                .userGrade(bean.getUserGrade())
                .build();
    }
}