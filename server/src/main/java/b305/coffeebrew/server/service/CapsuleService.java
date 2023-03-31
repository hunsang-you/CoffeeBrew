package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.bean.BeanResDTO;
import b305.coffeebrew.server.dto.capsule.CapsuleDetailPageResDTO;
import b305.coffeebrew.server.dto.capsule.CapsuleResDTO;
import b305.coffeebrew.server.entity.*;
import b305.coffeebrew.server.exception.CapsuleNotFoundException;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.repository.CapsuleDetailRepository;
import b305.coffeebrew.server.repository.CapsuleRepository;
import b305.coffeebrew.server.repository.CapsuleScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

        Capsule capsule = capsuleRepository.findByIdx(capsuleId);
        CapsuleDetail capsuleDetail = capsuleDetailRepository.findByCapsuleIdx(capsule);
        CapsuleScore capsuleScore = capsuleScoreRepository.findByCapsuleIdx(capsule);

        if (capsule == null || capsuleDetail == null || capsuleScore == null) {
            throw new CapsuleNotFoundException(ErrorCode.CAPSULE_NOT_FOUND);
        }

        String nameKo = capsule.getNameKo();
        String nameEn = capsule.getNameEn();
        String summary = capsule.getSummary();
        String thumbnail = capsule.getThumbnail();
        int userGrade = capsule.getUserGrade();

        String description = capsuleDetail.getDescription();
        String company = capsuleDetail.getCompany();
        String origin = capsuleDetail.getOrigin();
        String machineType = capsuleDetail.getMachineType();

        int balance = capsuleScore.getBalance();
        int flavor = capsuleScore.getFlavor();
        int acidity = capsuleScore.getAcidity();
        int bitterness = capsuleScore.getBitterness();
        int body = capsuleScore.getBody();
        int roasting = capsuleScore.getRoasting();
        String coffeeingNote = capsuleScore.getCoffeeingNote();

        return CapsuleDetailPageResDTO.builder()
                .nameKo(nameKo)
                .nameEn(nameEn)
                .summary(summary)
                .thumbnail(thumbnail)
                .userGrade(userGrade)
                .description(description)
                .company(company)
                .origin(origin)
                .machineType(machineType)
                .balance(balance)
                .flavor(flavor)
                .acidity(acidity)
                .bitterness(bitterness)
                .body(body)
                .roasting(roasting)
                .coffeeingNote(coffeeingNote)
                .build();
    }

    public Page<CapsuleResDTO> searchCapsules(List<String> keywords, Pageable pageable) {
        if (CollectionUtils.isEmpty(keywords)) {
            return capsuleRepository.findAll(pageable).map(CapsuleResDTO::of);
        } else {
            Set<Capsule> result = new HashSet<>();
            for (String keyword : keywords) {
                String processedKeyword = "%" + keyword.toLowerCase() + "%";
                result.addAll(capsuleRepository.findCapsulesByKeyword(processedKeyword, pageable).getContent());
            }
            return new PageImpl<>(new ArrayList<>(result)).map(CapsuleResDTO::of);
        }
    }
}