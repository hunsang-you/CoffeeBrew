package b305.coffeebrew.server.service;

import b305.coffeebrew.server.config.utils.Msg;
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
    public Likelist toggleLikelist(String itemType, Long itemId, Long memberIdx) {
        Member member = Member.builder().idx(memberIdx).build();

        // Bean의 경우
        if (itemType.equals("bean")) {
            Bean bean = beanRepository.findById(itemId).orElseThrow(() -> new EntityNotFoundException(Msg.FAIL_BEAN_FOUND));
            List<Likelist> likelists = likelistRepository.findByItemTypeAndMemberAndItemIdxAndExpired(itemType, member, itemId, false);

            if (likelists.isEmpty()) {
                return likelistRepository.save(Likelist.builder()
                        .member(member)
                        .itemType(itemType)
                        .itemIdx(itemId)
                        .expired(false)
                        .build());
            } else {
                Likelist likelist = likelists.get(0);
                likelist.setExpired(!likelist.isExpired());
                return likelist;
            }
        }
        // Capsule의 경우
        else if (itemType.equals("capsule")) {
            Capsule capsule = capsuleRepository.findById(itemId).orElseThrow(() -> new EntityNotFoundException(Msg.FAIL_CAPSULE_FOUND));
            List<Likelist> likelists = likelistRepository.findByItemTypeAndMemberAndItemIdxAndExpired(itemType, member, itemId, false);

            if (likelists.isEmpty()) {
                return likelistRepository.save(Likelist.builder()
                        .member(member)
                        .itemType(itemType)
                        .itemIdx(itemId)
                        .expired(false)
                        .build());
            } else {
                Likelist likelist = likelists.get(0);
                likelist.setExpired(!likelist.isExpired());
                return likelist;
            }
        }
        // itemType이 bean도 아니고 capsule도 아닌 경우
        else {
            throw new IllegalArgumentException(Msg.INVALID_ITEM_TYPE);
        }
    }

    public List<Likelist> getLikelist(String itemType, Long memberIdx, boolean expired) {
        Member member = Member.builder().idx(memberIdx).build();
        return likelistRepository.findByItemTypeAndMemberAndExpired(itemType, member, expired);
    }
}