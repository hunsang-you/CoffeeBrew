package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Bean;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeanRepository extends JpaRepository<Bean, Long> {
}
