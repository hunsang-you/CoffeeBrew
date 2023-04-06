package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
//    Member findByMemberEmail(String memberEmail);
    Optional<Member> findByMemberEmailAndExpiredIsFalse(String memberEmail); // 이미 expired와 email을 통해 생성된 사용자인지 체크

    Optional<Member> findByMemberEmail(String memberEmail);// 이미 email을 통해 생성된 사용자인지 체크
    @Query("SELECT m FROM Member m WHERE m.idx = :idx")
    List<Member> findMyProfile(@Param("idx") long idx);

    boolean existsByMemberEmail(String memberEmail);

    @Query("update Member m set m.profileImg = :profileImg, m.nickname = :nickname where m.idx= :idx")
    @Modifying(clearAutomatically = true)
    int updateMember(@Param("profileImg") String profileImg, @Param("nickname") String nickname, @Param("idx") long idx);

    @Query("update Member m set m.ageRange = :ageRange, m.gender = :gender where m.idx= :idx")
    @Modifying(clearAutomatically = true)
    int updateMemberAgeAndGender(@Param("ageRange") String ageRange, @Param("gender") String gender, @Param("idx") long idx);

    @Query("select m.idx from Member m where m.memberEmail like :memberEmail")
    Optional<Long> findIdxByMemberEmail(String memberEmail);

    Optional<Member> findByIdxAndExpiredFalse(long memberIdx);
}
