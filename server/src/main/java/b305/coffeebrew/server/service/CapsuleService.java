package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.bean.BeanDetailPageResDTO;
import b305.coffeebrew.server.dto.capsule.CapsuleDetailPageResDTO;
import b305.coffeebrew.server.entity.*;
import b305.coffeebrew.server.exception.CapsuleNotFoundException;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MyPageHistoryException;
import b305.coffeebrew.server.repository.CapsuleDetailRepository;
import b305.coffeebrew.server.repository.CapsuleRepository;
import b305.coffeebrew.server.repository.CapsuleScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CapsuleService {

    private static final String METHOD_NAME = CapsuleService.class.getName();

    private final CapsuleRepository capsuleRepository;
    private final CapsuleDetailRepository capsuleDetailRepository;
    private final CapsuleScoreRepository capsuleScoreRepository;

    @Transactional
    public CapsuleDetailPageResDTO getCapsuleDetail(Long capsuleId) {
        log.info("{} - getCapsuleDetail", this.getClass().getName());

        Capsule capsule = capsuleRepository.findById(capsuleId)
                .orElseThrow(() -> new CapsuleNotFoundException(ErrorCode.CAPSULE_NOT_FOUND));

        CapsuleDetail capsuleDetail = capsuleDetailRepository.findById(capsuleId)
                .orElseThrow(() -> new CapsuleNotFoundException(ErrorCode.CAPSULE_NOT_FOUND));

        CapsuleScore capsuleScore = capsuleScoreRepository.findById(capsuleId)
                .orElseThrow(() -> new CapsuleNotFoundException(ErrorCode.CAPSULE_NOT_FOUND));

        return CapsuleDetailPageResDTO.builder()
                .nameKo(capsule.getNameKo())
                .nameEn(capsule.getNameEn())
                .summary(capsule.getSummary())
                .thumbnail(capsule.getThumbnail())
                .userGrade(capsule.getUserGrade())
                .description(capsuleDetail.getDescription())
                .company(capsuleDetail.getCompany())
                .origin(capsuleDetail.getOrigin())
                .machineType(capsuleDetail.getMachineType())
                .overall(capsuleScore.getOverall())
                .flavor(capsuleScore.getFlavor())
                .acidity(capsuleScore.getAcidity())
                .bitterness(capsuleScore.getBitterness())
                .body(capsuleScore.getBody())
                .roasting(capsuleScore.getRoasting())
                .coffeeingNote(capsuleScore.getCoffeeingNote())
                .build();
    }


}
