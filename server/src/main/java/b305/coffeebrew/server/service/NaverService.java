package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.naverShopping.LinkDTO;
import b305.coffeebrew.server.dto.naverShopping.NaverShoppingItemDTO;
import b305.coffeebrew.server.dto.naverShopping.NaverShoppingResDTO;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashSet;
import java.util.Set;

@Slf4j
@Service
@Transactional(readOnly = true)
public class NaverService {

    private final RestTemplate restTemplate;
    private final String clientId;
    private final String clientSecret;

    public NaverService(RestTemplate restTemplate, @Value("${naver.shopping.client-id}") String clientId, @Value("${naver.shopping.client-secret}") String clientSecret) {
        this.restTemplate = restTemplate;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public Set<LinkDTO> searchNaverShopping(String nameKo, String nameEn) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Naver-Client-Id", clientId);
        headers.add("X-Naver-Client-Secret", clientSecret);

        String query = nameKo;
        log.info(query);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<NaverShoppingResDTO> response = restTemplate.exchange(
                "https://openapi.naver.com/v1/search/shop.json?query={query}",
                HttpMethod.GET,
                requestEntity,
                NaverShoppingResDTO.class,
                query
        );
        NaverShoppingResDTO naverShoppingResponse = response.getBody();
        Set<LinkDTO> result = new LinkedHashSet<>();

        if (naverShoppingResponse != null && !naverShoppingResponse.getItems().isEmpty()) {
            for (NaverShoppingItemDTO item : naverShoppingResponse.getItems()) {
                String mallName = item.getMallName();
                String link = item.getLink();
                String image = item.getImage();

                if (!result.contains(LinkDTO.of(mallName, link, image))) {
                    result.add(LinkDTO.of(mallName, link, image));
                }

                if (result.size() >= 5) {
                    return result;
                }
            }
        }

        if (result.size() < 5 && StringUtils.isNotBlank(nameEn)) {
            query = nameEn;
            log.info(query);
            response = restTemplate.exchange(
                    "https://openapi.naver.com/v1/search/shop.json?query={query}",
                    HttpMethod.GET,
                    requestEntity,
                    NaverShoppingResDTO.class,
                    query
            );
            naverShoppingResponse = response.getBody();

            if (naverShoppingResponse != null && !naverShoppingResponse.getItems().isEmpty()) {
                for (NaverShoppingItemDTO item : naverShoppingResponse.getItems()) {
                    String mallName = item.getMallName();
                    String link = item.getLink();
                    String image = item.getImage();

                    if (!result.contains(LinkDTO.of(mallName, link, image))) {
                        result.add(LinkDTO.of(mallName, link, image));
                    }

                    if (result.size() >= 5) {
                        return result;
                    }
                }
            }
        }

        return result;
    }
}