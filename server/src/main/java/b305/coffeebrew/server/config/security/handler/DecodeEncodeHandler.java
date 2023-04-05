package b305.coffeebrew.server.config.security.handler;

import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Slf4j
public class DecodeEncodeHandler {
	private static final String METHOD_NAME = DecodeEncodeHandler.class.getName();
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final MemberRepository memberRepository;

	@Autowired
	public DecodeEncodeHandler(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	public String passwordEncode(String password) {
		return passwordEncoder.encode(password);
	}

	public String roleValid(String memberId) {
		log.info(METHOD_NAME + "- roleValid() ...");
		Optional<Member> optionalMember = memberRepository.findByMemberEmailAndExpiredIsFalse(memberId);
		if (optionalMember.isPresent()) {
			log.info("Member memberId Validate - Success");
			return optionalMember.get().getRole();
		} else {
			log.warn("Member memberId Validate - Fail");
			return "ROLE_MEMBER"; // 기본값 설정
		}
	}

	public boolean memberIdValid(String memberId) {
		log.info(METHOD_NAME + "- emailValid() ...");
		try {
			Optional<Member> member = memberRepository.findByMemberEmailAndExpiredIsFalse(memberId);
			if (member.isPresent()) {
				log.info("Member Validate - Success");
				Member m = member.get();
				if (m.getMemberEmail() != null) {
					log.info("Member memberId Validate - Success");
					return true;
				} else {
					log.warn("Member memberId Validate - Fail");
				}
			} else {
				log.warn("Member Validate - Fail");
			}
		} catch (Exception e) {
			log.error("SERVER ERROR " + METHOD_NAME, e);
		}
		return false;
	}
}
