package b305.coffeebrew.server.dto.review;

import b305.coffeebrew.server.config.utils.BooleanToYNConverter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Convert;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor

public class ReviewRegistDTO {
    private String item_type;
    private Long item_idx;
    private String title;
    private String content;
    private int overall; // 총점
    private int aroma; // 향
    private int flavor; // 맛
    private int acidity; // 산미
    private int body; // 바디감
    private int balance; // 밸런스
    private String aroma_note; // 향 상세
    private String flavor_note; // 맛 상세

    @Builder
    public ReviewRegistDTO(String item_type, Long item_idx, String title, String content, int overall, int aroma, int flavor, int acidity, int body, int balance, String aroma_note, String flavor_note) {
        this.item_type = item_type;
        this.item_idx = item_idx;
        this.title = title;
        this.content = content;
        this.overall = overall;
        this.aroma = aroma;
        this.flavor = flavor;
        this.acidity = acidity;
        this.body = body;
        this.balance = balance;
        this.aroma_note = aroma_note;
        this.flavor_note = flavor_note;
    }
}
