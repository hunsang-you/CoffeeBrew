package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BeanRepository extends JpaRepository<Bean, Long> {
    Bean findByIdx(Long beanId);

    @Query("SELECT b FROM Bean b WHERE (:keywords IS NULL OR LOWER(b.summary) LIKE %:keywords% OR LOWER(b.nameKo) LIKE %:keywords%)")
    Page<Bean> findBeansByKeywords(@Param("keywords") String keywords, Pageable pageable);

}
