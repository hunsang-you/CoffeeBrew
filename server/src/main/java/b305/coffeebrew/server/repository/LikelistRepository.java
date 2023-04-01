package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Likelist;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikelistRepository extends JpaRepository<Likelist, Long> {
    Page<Likelist> findByMemberIdxAndItemType(Member member, String itemType,  Pageable pageable);
}
