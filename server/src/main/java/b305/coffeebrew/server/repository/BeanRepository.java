package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Bean;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BeanRepository extends JpaRepository<Bean, Long> {
    Bean findByIdx(Long beanId);
}
