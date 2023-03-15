package b305.coffeebrew.server.config.security.handler;

import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

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
		if (memberRepository.existsByMemberId(memberId)) {
			log.info("Member memberId Validate - Success");
			Member member = memberRepository.findByMemberId(memberId);
			return member.getRole();
		}
		log.warn("Member memberId Validate - Fail");
		return null;
	}

	public boolean memberIdValid(String memberId) {
		log.info(METHOD_NAME + "- emailValid() ...");
		try {
			Member member = memberRepository.findByMemberId(memberId);
			if (member != null) {
				log.info("Memeber Validate - Success");
				if (member.getMemberId() != null) {
					log.info("Member memberId Validate - Success");
					return true;
				} else log.warn("Member memberId Validate - Fail");
			} else log.warn("Member Validate - Fail");
		} catch (Exception e) {
			log.error("SERVER ERROR " + METHOD_NAME, e);
		}
		return false;
	}

//	public boolean passwordValid(String memberId, String password) {
//		log.info(METHOD_NAME + "- passwordValid() ...");
//		try {
//			Member member = memberRepository.findByMemberId(memberId);
//			if (passwordEncoder.matches(password, member.getPassword())) {
//				log.info("Password validate - Success");
//				return true;
//			} else log.warn("Password validate - Fail");
//		} catch (Exception e) {
//			log.error("SERVER ERROR " + METHOD_NAME, e);
//		}
//		return false;
//	}
}
