package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.bean.BeanDetailPageResDTO;
import b305.coffeebrew.server.dto.bean.BeanResDTO;
import b305.coffeebrew.server.dto.capsule.CapsuleDetailPageResDTO;
import b305.coffeebrew.server.dto.recommend.RecomResDTO;
import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.BeanDetail;
import b305.coffeebrew.server.entity.BeanScore;
import b305.coffeebrew.server.exception.BeanNotFoundException;
import b305.coffeebrew.server.exception.CoffeebrewServerException;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.repository.BeanDetailRepository;
import b305.coffeebrew.server.repository.BeanRepository;
import b305.coffeebrew.server.repository.BeanScoreRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import java.io.DataInput;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecommendService {

    private static final String METHOD_NAME = RecommendService.class.getName();


    private final BeanService beanService;
    private final CapsuleService capsuleService;
    private final BeanRepository beanRepository;
    private final BeanDetailRepository beanDetailRepository;
    private final BeanScoreRepository beanScoreRepository;

    @Value(value = "${user.url.fastapi}")
    private String fastapiURL;

    public List<?> itemRecommend(String itemType, long itemId) {
        log.info(METHOD_NAME + " - itemRecommend");
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/item/" + itemType + "/" + String.valueOf(itemId);
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response, itemType);
    }

    public List<?> userRecommend(long userId, String itemType) {
        log.info(METHOD_NAME + " - userRecommend");
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/user/" + String.valueOf(userId) + "/" + itemType;
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response, itemType);
    }

    public List<?> userRecommendLikeSurvey(long userId, String itemType) {
        log.info(METHOD_NAME + " - userRecommendLikeSurvey");
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/user/" + String.valueOf(userId) + "/" + itemType + "/survey";
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response, itemType);
    }

    public List<?> userRecommendByLike(long userId, String itemType) {
        log.info(METHOD_NAME + " - userRecommendByLike");
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/user/" + String.valueOf(userId) + "/" + itemType + "/like";
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response, itemType);
    }

    public List<?> userRecommendByReview(long userId, String itemType) {
        log.info(METHOD_NAME + " - userRecommendByReview");
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/user/" + String.valueOf(userId) + "/" + itemType + "/review";
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response, itemType);
    }

    public List<?> recommendByAge(String ageRange, String itemType) {
        log.info(METHOD_NAME + " - recommendByAge");
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/age/" + String.valueOf(ageRange) + "/" + itemType;
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response, itemType);
    }

    public List<?> recommendByGender(String gender, String itemType) {
        log.info(METHOD_NAME + " - recommendByGender");
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/gender/" + String.valueOf(gender) + "/" + itemType;
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response, itemType);
    }

    /**
     * 스케쥴러 업데이트
     **/
    public void recommendUpdate() {
        log.info("call Rest URL - " + fastapiURL);
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/update";
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);
        log.info("Update response = {}", response);
    }

    private List<?> getRecomsDetail(HttpEntity<String> response, String itemType) {
        // JSON Parsing
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);

        List<RecomResDTO> recomResDTOList;
        try {
            recomResDTOList = objectMapper.readValue(response.getBody(), new TypeReference<List<RecomResDTO>>() {
            });
        } catch (JsonProcessingException e) {
            throw new CoffeebrewServerException(ErrorCode.RECOM_SERVER_ERROR);
        }

        switch (itemType) {
            case "bean":
                List<BeanDetailPageResDTO> beanDTOList = new ArrayList<>();
                for (RecomResDTO recomResDTO : recomResDTOList) {
                    beanDTOList.add(beanService.getBeanDetail(recomResDTO.getId()));
                }
                return beanDTOList;
            case "capsule":
                List<CapsuleDetailPageResDTO> capsuleDTOList = new ArrayList<>();
                for (RecomResDTO recomResDTO : recomResDTOList) {
                    capsuleDTOList.add(capsuleService.getCapsuleDetail(recomResDTO.getId()));
                }
                return capsuleDTOList;
            default:
                return new ArrayList<>();
        }
    }

}