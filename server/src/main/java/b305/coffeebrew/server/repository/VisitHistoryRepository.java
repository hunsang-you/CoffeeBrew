package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.VisitHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitHistoryRepository extends JpaRepository<VisitHistory, Long> {
}
