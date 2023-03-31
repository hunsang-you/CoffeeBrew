package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Capsule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CapsuleRepository extends JpaRepository<Capsule, Long> {
    Capsule findByIdx(Long capsuleId);

    @Query("SELECT c FROM Capsule c WHERE LOWER(c.summary) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.nameKo) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Capsule> findCapsulesByKeyword(@Param("keyword") String keyword, Pageable pageable);
}