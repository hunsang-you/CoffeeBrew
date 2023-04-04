package b305.coffeebrew.server.dto.naverShopping;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class NaverShoppingItemDTO {
    private String title;
    private String link;
    private String image;
    private String lprice;
    private String hprice;
    private String mallName;
    private String productId;
    private String productType;
    private String brand;
    private String maker;
    private String category1;
    private String category2;
    private String category3;
    private String category4;

    @Builder
    public NaverShoppingItemDTO(String title, String link, String image, String lprice, String hprice, String mallName,
                                String productId, String productType, String brand, String maker, String category1,
                                String category2, String category3, String category4) {
        this.title = title;
        this.link = link;
        this.image = image;
        this.lprice = lprice;
        this.hprice = hprice;
        this.mallName = mallName;
        this.productId = productId;
        this.productType = productType;
        this.brand = brand;
        this.maker = maker;
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.category4 = category4;
    }

    public static NaverShoppingItemDTO of(Map<String, String> item) {
        return NaverShoppingItemDTO.builder()
                .title(item.get("title"))
                .link(item.get("link"))
                .image(item.get("image"))
                .lprice(item.get("lprice"))
                .hprice(item.get("hprice"))
                .mallName(item.get("mallName"))
                .productId(item.get("productId"))
                .productType(item.get("productType"))
                .brand(item.get("brand"))
                .maker(item.get("maker"))
                .category1(item.get("category1"))
                .category2(item.get("category2"))
                .category3(item.get("category3"))
                .category4(item.get("category4"))
                .build();
    }

    // getters and setters
}