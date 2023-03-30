package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	List<Review> findByItemTypeAndItemIdx(String itemType, Long itemIdx);

}
