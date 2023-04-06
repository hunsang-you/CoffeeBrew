package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.capsule.*;
import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.CapsuleDetail;
import b305.coffeebrew.server.entity.CapsuleScore;
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

import java.util.*;
import java.util.stream.Collectors;

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

        CapsuleResDTO capsuleResDTO = CapsuleResDTO.of(capsule);
        CapsuleDetailResDTO capsuleDetailResDTO = CapsuleDetailResDTO.of(capsuleDetail);
        CapsuleScoreResDTO capsuleScoreResDTO = CapsuleScoreResDTO.of(capsuleScore);

        return CapsuleDetailPageResDTO.builder()
                .capsule(capsuleResDTO)
                .capsuleDetail(capsuleDetailResDTO)
                .capsuleScore(capsuleScoreResDTO)
                .build();
    }

    public Page<CapsuleSearchResDTO> searchCapsules(List<String> keywords, Pageable pageable) {
        if (CollectionUtils.isEmpty(keywords)) {
            return capsuleRepository.findAll(pageable).map(capsule -> {
                CapsuleScore capsuleScore = capsuleScoreRepository.findByCapsuleIdx(capsule);
                return CapsuleSearchResDTO.of(capsule, capsuleScore);
            });
        } else {
            Set<Capsule> capsules = new TreeSet<>(Comparator.comparing(Capsule::getNameKo).thenComparing(Capsule::getNameEn).thenComparing(Capsule::getSummary));
            for (String keyword : keywords) {
                String processedKeyword = "%" + keyword.toLowerCase() + "%";
                capsules.addAll(capsuleRepository.findCapsulesByKeyword(processedKeyword, pageable).getContent());
            }
            List<CapsuleSearchResDTO> capsuleDTOs = new ArrayList<>();
            for (Capsule capsule : capsules) {
                CapsuleScore capsuleScore = capsuleScoreRepository.findByCapsuleIdx(capsule);
                CapsuleSearchResDTO capsuleDTO = CapsuleSearchResDTO.of(capsule, capsuleScore);
                capsuleDTOs.add(capsuleDTO);
            }
            int fromIndex = (int) pageable.getOffset();
            int toIndex = Math.min(fromIndex + pageable.getPageSize(), capsuleDTOs.size());
            List<CapsuleSearchResDTO> pagedCapsuleDTOs = capsuleDTOs.subList(fromIndex, toIndex);
            return new PageImpl<>(pagedCapsuleDTOs, pageable, capsuleDTOs.size());
        }
    }
}