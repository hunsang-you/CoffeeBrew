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
        log.info("{} - getBeanDetail", this.getClass().getName());

        Bean bean = beanRepository.findById(beanId)
                .orElseThrow(() -> new BeanNotFoundException(ErrorCode.BEAN_NOT_FOUND));

        BeanDetail beanDetail = beanDetailRepository.findById(beanId)
                .orElseThrow(() -> new BeanNotFoundException(ErrorCode.BEAN_NOT_FOUND));

        BeanScore beanScore = beanScoreRepository.findById(beanId)
                .orElseThrow(() -> new BeanNotFoundException(ErrorCode.BEAN_NOT_FOUND));

        return BeanDetailPageResDTO.builder()
                .nameKo(bean.getNameKo())
                .nameEn(bean.getNameEn())
                .summary(bean.getSummary())
                .thumbnail(bean.getThumbnail())
                .userGrade(bean.getUserGrade())
                .description(beanDetail.getDescription())
                .origin(beanDetail.getOrigin())
                .region(beanDetail.getRegion())
                .rank(beanDetail.getRank())
                .processing(beanDetail.getProcessing())
                .decaffeination(beanDetail.isDecaffeination())
                .overall(beanScore.getOverall())
                .flavor(beanScore.getFlavor())
                .acidity(beanScore.getAcidity())
                .sweetness(beanScore.getSweetness())
                .bitterness(beanScore.getBitterness())
                .body(beanScore.getBody())
                .coffeeingNote(beanScore.getCoffeeingNote())
                .build();
    }
}
