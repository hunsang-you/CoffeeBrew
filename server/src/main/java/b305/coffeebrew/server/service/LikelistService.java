package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.likelist.LikelistResDTO;
import b305.coffeebrew.server.entity.Likelist;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.repository.BeanRepository;
import b305.coffeebrew.server.repository.CapsuleRepository;
import b305.coffeebrew.server.repository.LikelistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LikelistService {

    private static final String METHOD_NAME = LikelistService.class.getName();

    private final LikelistRepository likelistRepository;
    private final BeanRepository beanRepository;
    private final CapsuleRepository capsuleRepository;

    @Transactional
    public LikelistResDTO toggleLikelist(String itemType, Long itemIdx, Long memberIdx) {
        Member member = new Member();
        member.setIdx(memberIdx);

        Likelist likelist = likelistRepository.findByItemTypeAndMemberAndItemIdx(itemType, member, itemIdx);
        if (likelist != null) {
            likelist.setExpired(!likelist.isExpired());
            likelist.setUpdatedDate(LocalDateTime.now()); // 업데이트된 시간 설정
            return LikelistResDTO.of(likelist);
        } else {
            Likelist newLikelist = new Likelist();
            newLikelist.setItemType(itemType);
            newLikelist.setMember(member);
            newLikelist.setItemIdx(itemIdx);
            newLikelist.setExpired(false);
            newLikelist.setCreatedDate(LocalDateTime.now()); // 생성된 시간 설정
            newLikelist.setUpdatedDate(LocalDateTime.now());
            Likelist savedLikelist = likelistRepository.save(newLikelist);
            return LikelistResDTO.of(savedLikelist);
        }
    }

    public List<Likelist> getLikelist(String itemType, Long memberIdx) {
        return likelistRepository.findTop9ByItemTypeAndMemberIdxOrderByUpdatedDateDesc(itemType, memberIdx);
    }


    /**
     * 사용자 선호 원두 또는 캡슐 조회
     */
    @Transactional
    public Page<Likelist> readMyPageLike(long memberIdx, String itemType, Pageable pageable) throws RuntimeException{
        Member member = new Member();
        member.setIdx(memberIdx);
        Page<Likelist> likeList = likelistRepository.findByMemberAndItemType(member, itemType, pageable);
        log.info("likeList = {}", likeList);
        return likeList;
    }
}