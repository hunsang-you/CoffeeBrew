package b305.coffeebrew.server.service;

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




}
