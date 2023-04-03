package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.bean.BeanDetailPageResDTO;
import b305.coffeebrew.server.dto.bean.BeanResDTO;
import b305.coffeebrew.server.dto.recommend.RecomResDTO;
import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.BeanDetail;
import b305.coffeebrew.server.entity.BeanScore;
import b305.coffeebrew.server.exception.BeanNotFoundException;
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

    private final BeanRepository beanRepository;
    private final BeanDetailRepository beanDetailRepository;
    private final BeanScoreRepository beanScoreRepository;

    @Value(value = "${user.url.fastapi}")
    public String fastapiURL;

    public List<BeanResDTO> recommendBeans(long beanId) {
        log.info(METHOD_NAME + "- recommendBeans");
        RestTemplate restTemplate = new RestTemplate();
        log.info(fastapiURL);

        // Request
        HttpEntity<String> response = restTemplate.getForEntity(fastapiURL + "/bean/" + String.valueOf(beanId), String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);

        List<RecomResDTO> recomResDTOList = null;
        try {
            recomResDTOList = objectMapper.readValue(response.getBody(),  new TypeReference<List<RecomResDTO>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        List<BeanResDTO> beanResDTOList = new ArrayList<>();
        for(RecomResDTO recomResDTO : recomResDTOList) {
            log.info("testLog - " + recomResDTO.toString());
            beanResDTOList.add(BeanResDTO.of(beanRepository.findByIdx(recomResDTO.getId())));
        }

        return beanResDTOList;
    }
}