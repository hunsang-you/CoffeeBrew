package b305.coffeebrew.server.dto.naverShopping;

import lombok.*;

import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class LinkDTO {
    private String mallName;
    private String link;
    private String image;

    @Builder
    public LinkDTO(String mallName, String link, String image) {
        this.mallName = mallName;
        this.link = link;
        this.image = image;
    }

    public static LinkDTO of(String mallName, String link, String image) {
        return LinkDTO.builder()
                .mallName(mallName)
                .link(link)
                .image(image)
                .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LinkDTO linkDTO = (LinkDTO) o;
        return Objects.equals(mallName, linkDTO.mallName) && Objects.equals(link, linkDTO.link) && Objects.equals(image, linkDTO.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(mallName, link, image);
    }
}