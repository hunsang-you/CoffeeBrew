package b305.coffeebrew.server.dto.member;

import b305.coffeebrew.server.entity.Member;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SignModReqDTO {

	@NotEmpty(message = "빈 값은 허용되지 않습니다.", groups = {mod.class})
	@Size(max = 10, message = "닉네임은 최대 10자리까지 입력 가능합니다.")
	@Pattern(regexp = "^(?=.*[a-zA-Z가-힣])(?=.*[^a-zA-Z가-힣0-9\\s])[a-zA-Z가-힣0-9\\p{Punct}]{2,}$", message = "2글자 이상이며, 영어와 한글을 포함하며, 특수문자는 사용할 수 없습니다.", groups = {mod.class})
	private String nickname;

	@NotEmpty(message = "빈 값은 허용되지 않습니다.", groups = {mod.class})
	@Pattern(regexp = "(?i)\\.(jpg|jpeg|png)$", message = "이미지 파일만 업로드 가능합니다.", groups = {mod.class})
	private String profileImg;

	@NotEmpty(message = "빈 값은 허용되지 않습니다.", groups = {mod.class})
	private Long kakaoId;

	@Builder
	public SignModReqDTO(String nickname, String profileImg, Long kakaoId) {
		this.nickname = nickname;
		this.profileImg = profileImg;
		this.kakaoId = kakaoId;
	}

	public Member of(String nickname, String profileImg, Long kakaoId) {
		return Member.builder().nickname(nickname).profileImg(profileImg).kakaoId(kakaoId).build();
	}
}
