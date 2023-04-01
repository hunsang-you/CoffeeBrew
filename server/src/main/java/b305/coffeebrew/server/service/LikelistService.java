package b305.coffeebrew.server.service;

import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.dto.likelist.LikelistResDTO;
import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.Likelist;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.repository.BeanRepository;
import b305.coffeebrew.server.repository.CapsuleRepository;
import b305.coffeebrew.server.repository.LikelistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

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
            return LikelistResDTO.of(likelist);
        } else {
            Likelist newLikelist = new Likelist();
            newLikelist.setItemType(itemType);
            newLikelist.setMember(member);
            newLikelist.setItemIdx(itemIdx);
            newLikelist.setExpired(false);
            Likelist savedLikelist = likelistRepository.save(newLikelist);
            return LikelistResDTO.of(savedLikelist);
        }
    }

    public List<Likelist> getLikelist(String itemType, Long memberIdx, boolean expired) {
        Member member = Member.builder().idx(memberIdx).build();
        return likelistRepository.findByItemTypeAndMemberAndExpired(itemType, member, expired);
    }
}