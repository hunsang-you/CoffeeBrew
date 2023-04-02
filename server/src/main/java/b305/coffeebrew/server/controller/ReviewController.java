package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.security.auth.PrincipalDetails;
import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.dto.review.ReviewPageDTO;
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
@Api(value = "리뷰 관련 API", tags = {"Review"})
public class ReviewController {


    private final ReviewService reviewService;

    /**
     * 원두 리뷰 조회
     */
    @GetMapping("/{itemType}/{itemIdx}")
    @ApiOperation(value = "리뷰 조회", notes = "")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> readReview(@PathVariable String itemType , @PathVariable String itemIdx) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_REVIEW_GET, reviewService.readReview(itemType, itemIdx)));
    }
}