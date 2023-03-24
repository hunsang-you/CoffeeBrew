package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Capsule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CapsuleScoreRepository extends JpaRepository<Capsule, Long> {
}
