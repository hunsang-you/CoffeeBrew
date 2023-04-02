package b305.coffeebrew.server.dto.likelist;

import b305.coffeebrew.server.entity.Likelist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class LikelistReqDTO {

    @NotBlank
    private String itemType;

    @NotNull
    private Long itemIdx;

    @Builder
    public LikelistReqDTO(@NotBlank String itemType, @NotNull Long itemIdx) {
        this.itemType = itemType;
        this.itemIdx = itemIdx;
    }

    public static LikelistReqDTO of(String itemType, Long itemIdx) {
        return LikelistReqDTO.builder()
                .itemType(itemType)
                .itemIdx(itemIdx)
                .build();
    }
}