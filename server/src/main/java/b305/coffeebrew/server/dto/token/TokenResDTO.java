package b305.coffeebrew.server.dto.token;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenResDTO {
	private int code;
	private String token;
}
