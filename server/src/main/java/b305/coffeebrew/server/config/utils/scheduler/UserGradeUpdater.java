package b305.coffeebrew.server.config.utils.scheduler;

import b305.coffeebrew.server.entity.Review;
import b305.coffeebrew.server.service.BeanService;
import b305.coffeebrew.server.service.CapsuleService;
import b305.coffeebrew.server.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class UserGradeUpdater {
	private static final String METHOD_NAME = UserGradeUpdater.class.getName();
	private final ReviewService reviewService;
//	@Scheduled(cron = "0 */1 * * * *")
	@Scheduled(cron = "0 0 */1 * * *") //매 시간 1시간 마다 실행 되도록
	public void updateData() {
		log.info(METHOD_NAME + " - usergarde update");
		reviewService.updateUserGradeFromReviews("bean");
		reviewService.updateUserGradeFromReviews("capsule");
	}
}
