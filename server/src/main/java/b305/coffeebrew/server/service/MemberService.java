package b305.coffeebrew.server.service;

import b305.coffeebrew.server.config.security.handler.DecodeEncodeHandler;
import b305.coffeebrew.server.controller.MemberController;
import b305.coffeebrew.server.dto.member.ProfileResDTO;
import b305.coffeebrew.server.dto.member.SignModReqDTO;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MemberNotFoundException;
import b305.coffeebrew.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private static final String METHOD_NAME = MemberController.class.getName();

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final DecodeEncodeHandler decodeEncodeHandler;
    private final MemberRepository memberRepository;

    /**
     * 회원 정보 수정
     */
    @Transactional
    public String update(SignModReqDTO signModReqDTO, long idx) throws RuntimeException {

        Member member = memberRepository.findById(idx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        String profileImg = signModReqDTO.getProfileImg();
        String nickname = signModReqDTO.getNickname();

        member.update(signModReqDTO);
        memberRepository.updateMember(profileImg, nickname, idx);

        return member.getMemberEmail();
    }

    /**
     * 회원 프로필 조회
     */
    @Transactional
    public ProfileResDTO readProfile(long idx) {

        List<Member> MyInfoList = memberRepository.findMyProfile(idx);
        return MyInfoList.stream().map(member -> ProfileResDTO.builder().build().of(member)).collect(Collectors.toList()).get(0);
    }

    /**
     * 회원 탈퇴
     */
    @Transactional
    public Long deleteMember(long memberIdx) {
        Optional<Member> member = memberRepository.findById(memberIdx);
        if(Objects.equals(member.get().getIdx(), memberIdx)) {
            memberRepository.deleteById(member.get().getIdx());
            return member.get().getIdx();
        }
        return -1L;
    }

//    @Transactional
//    public MemPageResDTO readMyPage(Long idx) {
//        log.info(METHOD_NAME + "- readMyPage");
//
//        Optional<Coin> optionalCoin = coinRepository.findById(idx);
//        if (!optionalCoin.isPresent()) {
//            throw new MyPageHistoryException(ErrorCode.MYPAGE_HISTORY_ERROR);
//        }
//
//        Integer myCoin = optionalCoin.get().getCoin();
//        List<MemPageDealDTO> reqList = dealRepository.findAllMyReqHistory(idx);
//        List<MemPageDealDTO> resList = dealRepository.findAllMyResHistory(idx);
//
//        return MemPageResDTO.builder()
//                .coin(myCoin)
//                .memPageDealDTOReqList(reqList != null ? reqList : Collections.emptyList())
//                .memPageDealDTOResList(resList != null ? resList : Collections.emptyList())
//                .build();
//    }
}