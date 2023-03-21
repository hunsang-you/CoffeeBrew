package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.ShopHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopHistoryRepository extends JpaRepository<ShopHistory, Long> {
}
