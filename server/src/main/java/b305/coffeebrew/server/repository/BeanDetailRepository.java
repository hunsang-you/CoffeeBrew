package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.BeanDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BeanDetailRepository extends JpaRepository<BeanDetail, Long> {
    BeanDetail findByIdx(Long beanId);
}
