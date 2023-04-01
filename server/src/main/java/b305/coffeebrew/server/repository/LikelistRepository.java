package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Likelist;
import b305.coffeebrew.server.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikelistRepository extends JpaRepository<Likelist, Long> {

    @Query("SELECT l FROM Likelist l WHERE l.itemType = :itemType AND l.member = :member AND l.expired = :expired")
    List<Likelist> findByItemTypeAndMemberAndExpired(@Param("itemType") String itemType, @Param("member") Member member, @Param("expired") boolean expired);

//    @Query("SELECT l FROM Likelist l WHERE l.itemType = :itemType AND l.member = :member AND l.itemIdx = :itemIdx AND l.expired = :expired")
//    List<Likelist> findByItemTypeAndMemberAndItemIdxAndExpired(@Param("itemType") String itemType, @Param("member") Member member, @Param("itemIdx") Long itemIdx, @Param("expired") boolean expired);

    Likelist findByItemTypeAndMemberAndItemIdx(String itemType, Member member, Long itemIdx);

}
