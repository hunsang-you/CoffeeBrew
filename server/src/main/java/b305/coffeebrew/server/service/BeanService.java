package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.bean.BeanDetailPageResDTO;
import b305.coffeebrew.server.dto.bean.BeanResDTO;
import b305.coffeebrew.server.dto.bean.BeanSearchResDTO;
import b305.coffeebrew.server.dto.naverShopping.LinkDTO;
import b305.coffeebrew.server.dto.naverShopping.NaverShoppingItemDTO;
import b305.coffeebrew.server.dto.naverShopping.NaverShoppingResDTO;
import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.BeanDetail;
import b305.coffeebrew.server.entity.BeanScore;
import b305.coffeebrew.server.exception.BeanNotFoundException;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.repository.BeanDetailRepository;
import b305.coffeebrew.server.repository.BeanRepository;
import b305.coffeebrew.server.repository.BeanScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class BeanService {

    private static final String METHOD_NAME = BeanService.class.getName();

    private final BeanRepository beanRepository;
    private final BeanDetailRepository beanDetailRepository;
    private final BeanScoreRepository beanScoreRepository;

    public BeanService(BeanRepository beanRepository, BeanDetailRepository beanDetailRepository, BeanScoreRepository beanScoreRepository, RestTemplate restTemplate, @Value("${naver.shopping.client-id}") String clientId, @Value("${naver.shopping.client-secret}") String clientSecret) {
        this.beanRepository = beanRepository;
        this.beanDetailRepository = beanDetailRepository;
        this.beanScoreRepository = beanScoreRepository;
    }

    @Transactional
    public BeanDetailPageResDTO getBeanDetail(Long beanId) {
        log.info(METHOD_NAME + "- getBeanDetail");

        Bean bean = beanRepository.findByIdx(beanId);
        BeanDetail beanDetail = beanDetailRepository.findByBeanIdx(bean);
        BeanScore beanScore = beanScoreRepository.findByBeanIdx(bean);

        if (bean == null || beanDetail == null || beanScore == null) {
            throw new BeanNotFoundException(ErrorCode.BEAN_NOT_FOUND);
        }

        long idx = bean.getIdx();
        String nameKo = bean.getNameKo();
        String nameEn = bean.getNameEn();
        String summary = bean.getSummary();
        String thumbnail = bean.getThumbnail();
        int userGrade = bean.getUserGrade();

        String description = beanDetail.getDescription();
        String origin = beanDetail.getOrigin();
        String region = beanDetail.getRegion();
        String rank = beanDetail.getRank();
        String processing = beanDetail.getProcessing();
        boolean decaffeination = beanDetail.isDecaffeination();

        int balance = beanScore.getBalance();
        int flavor = beanScore.getFlavor();
        int acidity = beanScore.getAcidity();
        int sweetness = beanScore.getSweetness();
        int bitterness = beanScore.getBitterness();
        int body = beanScore.getBody();
        String coffeeingNote = beanScore.getCoffeeingNote();
        String roastingPoint = beanScore.getRoastingPoint();

        return BeanDetailPageResDTO.builder()
                .idx(idx)
                .nameKo(nameKo)
                .nameEn(nameEn)
                .summary(summary)
                .thumbnail(thumbnail)
                .userGrade(userGrade)
                .description(description)
                .origin(origin)
                .region(region)
                .rank(rank)
                .processing(processing)
                .decaffeination(decaffeination)
                .balance(balance)
                .flavor(flavor)
                .acidity(acidity)
                .sweetness(sweetness)
                .bitterness(bitterness)
                .body(body)
                .coffeeingNote(coffeeingNote)
                .roastingPoint(roastingPoint)
                .build();
    }

    public Page<BeanSearchResDTO> searchBeans(List<String> keywords, Pageable pageable) {
        if (CollectionUtils.isEmpty(keywords)) {
            Page<Bean> beans = beanRepository.findAll(pageable);
            List<BeanSearchResDTO> dtoList = new ArrayList<>();
            for (Bean bean : beans) {
                BeanScore beanScore = beanScoreRepository.findByBeanIdx(bean);
                dtoList.add(BeanSearchResDTO.of(bean, beanScore));
            }
            return new PageImpl<>(dtoList, pageable, beans.getTotalElements());
        } else {
            Set<Bean> result = new TreeSet<>(Comparator.comparing(Bean::getNameKo)
                    .thenComparing(Bean::getNameEn)
                    .thenComparing(Bean::getSummary));
            for (String keyword : keywords) {
                String processedKeyword = "%" + keyword.toLowerCase() + "%";
                result.addAll(beanRepository.findBeansByKeyword(processedKeyword, pageable)
                        .getContent());
            }
            List<BeanSearchResDTO> dtoList = new ArrayList<>();
            for (Bean bean : result.stream().limit(pageable.getPageSize())
                    .collect(Collectors.toList())) {
                BeanScore beanScore = beanScoreRepository.findByBeanIdx(bean);
                dtoList.add(BeanSearchResDTO.of(bean, beanScore));
            }
            long total = result.size();
            return new PageImpl<>(dtoList, pageable, total);
        }
    }
}