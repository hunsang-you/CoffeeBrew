package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.bean.BeanDetailPageResDTO;
import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.BeanDetail;
import b305.coffeebrew.server.entity.BeanScore;
import b305.coffeebrew.server.exception.BeanNotFoundException;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MyPageHistoryException;
import b305.coffeebrew.server.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BeanService {

    private static final String METHOD_NAME = BeanService.class.getName();

    private final BeanRepository beanRepository;
    private final BeanDetailRepository beanDetailRepository;
    private final BeanScoreRepository beanScoreRepository;

    @Transactional
    public BeanDetailPageResDTO getBeanDetail(Long beanId) {
        log.info(METHOD_NAME + "- getBeanDetail");

        Bean bean = beanRepository.findByIdx(beanId);
        BeanDetail beanDetail = beanDetailRepository.findByBeanIdx(bean);
        BeanScore beanScore = beanScoreRepository.findByBeanIdx(bean);

//        if (bean==null || beanDetail==null || beanScore==null) {
//            throw new BeanNotFoundException(ErrorCode.BEAN_NOT_FOUND);
//        }

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

        return BeanDetailPageResDTO.builder()
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
                .build();
    }
}