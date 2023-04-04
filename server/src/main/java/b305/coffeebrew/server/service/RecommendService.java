package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.bean.BeanDetailPageResDTO;
import b305.coffeebrew.server.dto.bean.BeanResDTO;
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
    private final BeanRepository beanRepository;
    private final BeanDetailRepository beanDetailRepository;
    private final BeanScoreRepository beanScoreRepository;

    @Value(value = "${user.url.fastapi}")
    private String fastapiURL;

    public List<BeanDetailPageResDTO> recommendBeansByItem(long beanId) {
        log.info(METHOD_NAME + " - recommendBeansByItem");
        log.info("call Rest URL - " + fastapiURL);
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/bean/" + String.valueOf(beanId);
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response);
    }

    public List<BeanDetailPageResDTO> recommendBeansByLike(long userId) {
        log.info(METHOD_NAME + " - recommendBeansByLike");
        log.info("call Rest URL - " + fastapiURL);
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/user/" + String.valueOf(userId) + "/like";
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response);
    }

    public List<BeanDetailPageResDTO> recommendBeansByReview(long userId) {
        log.info(METHOD_NAME + " - recommendBeansByReview");
        log.info("call Rest URL - " + fastapiURL);
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/user/" + String.valueOf(userId) + "/review";
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response);
    }

    public List<BeanDetailPageResDTO> recommendBeansByAge(String ageRange) {
        log.info(METHOD_NAME + " - recommendBeansByAge");
        log.info("call Rest URL - " + fastapiURL);
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/age/" + String.valueOf(ageRange);
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response);
    }

    public List<BeanDetailPageResDTO> recommendBeansByGender(String gender) {
        log.info(METHOD_NAME + " - recommendBeansByGender");
        log.info("call Rest URL - " + fastapiURL);
        RestTemplate restTemplate = new RestTemplate();

        // Request
        String requestURL = fastapiURL + "/gender/" + String.valueOf(gender);
        HttpEntity<String> response = restTemplate.getForEntity(requestURL, String.class);

        return getRecomsDetail(response);
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

    private List<BeanDetailPageResDTO> getRecomsDetail(HttpEntity<String> response) {
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

        List<BeanDetailPageResDTO> beanDTOList = new ArrayList<>();
        for (RecomResDTO recomResDTO : recomResDTOList) {
            // log.info("recomResDTO - " + recomResDTO.toString());
            beanDTOList.add(beanService.getBeanDetail(recomResDTO.getId()));
        }

        return beanDTOList;
    }

}