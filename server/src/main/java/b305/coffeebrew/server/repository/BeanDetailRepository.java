package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.BeanDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeanDetailRepository extends JpaRepository<BeanDetail, Long> {
    BeanDetail findByBeanIdx(Bean bean);
}
