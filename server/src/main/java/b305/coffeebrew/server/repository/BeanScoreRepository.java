package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.BeanScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BeanScoreRepository extends JpaRepository<BeanScore, Long> {
    BeanScore findByIdx(Long beanId);
}
