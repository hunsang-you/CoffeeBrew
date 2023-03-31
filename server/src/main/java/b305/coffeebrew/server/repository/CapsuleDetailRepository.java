package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.CapsuleDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CapsuleDetailRepository extends JpaRepository<CapsuleDetail, Long> {
    CapsuleDetail findByCapsuleIdx(Capsule capsule);
}
