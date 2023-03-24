package b305.coffeebrew.server.dto.token;

import b305.coffeebrew.server.config.utils.RedisUtil;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenResDTO {
	private int code;
	private String token;

	// RedisUtil 주입
	private final RedisUtil redisUtil;

	public String getUserEmail() {
		String userEmail = null;
		// RedisUtil을 이용하여 memberEmail 가져오기
		try {
			userEmail = redisUtil.getData(token);
		} catch (Exception e) {
			// Redis에서 데이터를 가져오는 중 예외가 발생한 경우 처리
			// 예외 처리를 위한 코드 작성
		}
		return userEmail;
	}
}