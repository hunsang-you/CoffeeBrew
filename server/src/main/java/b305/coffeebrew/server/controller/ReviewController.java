package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.security.auth.PrincipalDetails;
import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.dto.review.ReviewRegistDTO;
import b305.coffeebrew.server.service.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;



@Slf4j
@RestController
@RequestMapping(value = "/review")
@RequiredArgsConstructor
@Api(value = "리뷰 관련 API", tags = {"Member"})
public class ReviewController {


    private final ReviewService reviewService;
    /**
     * 리뷰 작성
     */
    @PostMapping()
    @ApiOperation(value = "리뷰 등록", notes = "")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> regist(@RequestBody ReviewRegistDTO reviewRegistDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_REVIEW_REGISTER, reviewService.registReview(reviewRegistDTO, principalDetails.getMember().getIdx())));
    }

    /**
     * 리뷰 수정
     */
    @PutMapping("/{reviewId}")
    @ApiOperation(value = "리뷰 수정", notes = "회원 닉네임, 프로필 이미지 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> readProfile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_REVIEW_MOD, reviewService.updateReview(principalDetails.getMember().getIdx())));
    }

    /**
     * 리뷰 삭제
     */
    @DeleteMapping("/{reviewId}")
    @ApiOperation(value = "리뷰 삭제", notes = "리뷰 삭제를 진행")
    public ResponseEntity<ResponseDTO> delete(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_REVIEW_DELETE,  reviewService.deleteReview(principalDetails.getMember().getIdx())));
    }
}