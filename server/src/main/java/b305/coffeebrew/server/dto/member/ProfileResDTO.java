package b305.coffeebrew.server.dto.member;

import b305.coffeebrew.server.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
public class ProfileResDTO {

	private String profileImg;
	private String nickname;

	public ProfileResDTO(String profileImg, String nickname) {
		this.profileImg = profileImg;
		this.nickname = nickname;
	}

	public ProfileResDTO of(Member member) {
		return ProfileResDTO.builder()
				.profileImg(member.getProfileImg())
				.nickname(member.getNickname())
				.build();
	}

}
