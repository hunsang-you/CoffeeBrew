package b305.coffeebrew.server.dto.naverShopping;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class NaverShoppingResDTO {
    private String lastBuildDate;
    private int total;
    private int start;
    private int display;
    private List<NaverShoppingItemDTO> items;

    @Builder
    public NaverShoppingResDTO(String lastBuildDate, int total, int start, int display, List<NaverShoppingItemDTO> items) {
        this.lastBuildDate = lastBuildDate;
        this.total = total;
        this.start = start;
        this.display = display;
        this.items = items;
    }

    public static NaverShoppingResDTO of(String lastBuildDate, int total, int start, int display, List<NaverShoppingItemDTO> items) {
        return NaverShoppingResDTO.builder()
                .lastBuildDate(lastBuildDate)
                .total(total)
                .start(start)
                .display(display)
                .items(items)
                .build();
    }
}