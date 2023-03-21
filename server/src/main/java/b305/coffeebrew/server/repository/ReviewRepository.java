package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
