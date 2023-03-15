package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.security.auth.PrincipalDetails;
import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.dto.member.SignModReqDTO;
import b305.coffeebrew.server.dto.member.mod;
import b305.coffeebrew.server.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/member")
@RequiredArgsConstructor
public class MemberController {

    private static final String METHOD_NAME = MemberController.class.getName();

    private final MemberService memberService;

    /**
     * 회원 정보 수정
     */
    @PostMapping("/updateInfo")
    public ResponseEntity<ResponseDTO> update(@RequestBody @Validated(mod.class) SignModReqDTO signModReqDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_MOD, memberService.update(signModReqDTO, principalDetails.getMember().getIdx())));
    }
    /**
     * 회원 프로필 조회
     */
    @GetMapping("/profile/read")
    public ResponseEntity<ResponseDTO> readProfile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_PROFILE, memberService.readProfile(principalDetails.getMember().getIdx())));
    }

    /**
     * 회원 마이페이지
     */
//    @GetMapping("/profile/mypage")
//    public ResponseEntity<ResponseDTO> myPage(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_MYPAGE, memberService.readMyPage(principalDetails.getMember().getIdx())));
//    }
}
