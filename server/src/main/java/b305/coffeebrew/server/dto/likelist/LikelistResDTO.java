package b305.coffeebrew.server.dto.likelist;

import b305.coffeebrew.server.entity.Likelist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LikelistResDTO {

    private Long idx;
    private String itemType;
    private Long itemIdx;
    private boolean expired;

    @Builder
    public LikelistResDTO(Long idx, String itemType, Long itemIdx, boolean expired) {
        this.idx = idx;
        this.itemType = itemType;
        this.itemIdx = itemIdx;
        this.expired = expired;
    }

    public static LikelistResDTO of(Likelist likelist) {
        return LikelistResDTO.builder()
                .idx(likelist.getIdx())
                .itemType(likelist.getItemType())
                .itemIdx(likelist.getItemIdx())
                .expired(likelist.isExpired())
                .build();
    }
}
