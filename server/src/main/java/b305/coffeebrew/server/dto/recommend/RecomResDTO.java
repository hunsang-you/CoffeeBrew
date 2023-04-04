package b305.coffeebrew.server.dto.recommend;

import b305.coffeebrew.server.entity.Bean;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class RecomResDTO {

    private Long id;
    private String title;

    @Builder
    public RecomResDTO(Long id, String title) {
        this.id = id;
        this.title = title;
    }

//    public static RecomResDTO of(Bean bean) {
//        return RecomResDTO.builder()
//                .idx(bean.getIdx())
//                .nameKo(bean.getNameKo())
//                .nameEn(bean.getNameEn())
//                .summary(bean.getSummary())
//                .thumbnail(bean.getThumbnail())
//                .userGrade(bean.getUserGrade())
//                .build();
//    }
}