package b305.coffeebrew.server.dto.token;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReIssuanceTokenDTO {
	private String memberId;
	private String refreshToken;
}
