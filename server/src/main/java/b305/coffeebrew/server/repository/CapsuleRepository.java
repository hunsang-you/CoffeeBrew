package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CapsuleRepository extends JpaRepository<Capsule, Long> {
}