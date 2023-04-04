package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BeanRepository extends JpaRepository<Bean, Long> {
    Bean findByIdx(Long beanId);

    @Query("SELECT b FROM Bean b WHERE LOWER(b.summary) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(b.nameKo) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(b.nameEn) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY b.nameKo ASC, b.nameEn ASC, b.summary ASC")
    Page<Bean> findBeansByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
