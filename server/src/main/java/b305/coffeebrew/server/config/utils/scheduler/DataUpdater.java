package b305.coffeebrew.server.config.utils.scheduler;

import b305.coffeebrew.server.service.RecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class DataUpdater {
    private static final String METHOD_NAME = DataUpdater.class.getName();
    private final RecommendService recommendService;

    //    @Scheduled(cron = "0 6 20 * * *")
    @Scheduled(cron = "0 0 3 ? * SUN")     // 매주 일요일 03:00에 실행되는 코드

    public void updateData() {
        log.info(METHOD_NAME + " - recommend update");
        recommendService.recommendUpdate();
    }
}