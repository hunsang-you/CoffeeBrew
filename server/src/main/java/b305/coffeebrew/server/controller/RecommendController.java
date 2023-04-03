package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.service.BeanService;
import b305.coffeebrew.server.service.CapsuleService;
import b305.coffeebrew.server.service.MemberService;
import b305.coffeebrew.server.service.RecommendService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/recom")
@RequiredArgsConstructor
@Api(value = "추천 관련 API", tags = {"Recommend"})
public class RecommendController {

    private static final String METHOD_NAME = RecommendController.class.getName();

    private final BeanService beanService;
    private final CapsuleService capsuleService;

    private final MemberService memberService;

    private final RecommendService recommendService;

    @GetMapping("/bean/{beanId}")
    @ApiOperation(value = "원두 추천 페이지", notes = "해당 원두와 유사한 원두 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> recommendBeansByItem(@PathVariable("beanId") long beanId) {
        return ResponseEntity.ok()
                .body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_BEAN_RECOM, recommendService.recommendBeansByItem(beanId)));
    }

    @GetMapping("/user/{userId}/like/bean")
    @ApiOperation(value = "사용자 좋아요 기반 원두 추천 페이지", notes = "같은 제품의 좋아요를 누른 다른 사용자의 선호 원두 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> recommendBeansByLike(@PathVariable("userId") long userId) {
        return ResponseEntity.ok()
                .body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_BEAN_RECOM, recommendService.recommendBeansByLike(userId)));
    }

    @GetMapping("/user/{userId}/review/bean")
    @ApiOperation(value = "사용자 리뷰 기반 원두 추천 페이지", notes = "같은 제품을 리뷰를 작성한 다른 사용자의 선호 원두 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> recommendBeansByReview(@PathVariable("userId") long userId) {
        return ResponseEntity.ok()
                .body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_BEAN_RECOM, recommendService.recommendBeansByReview(userId)));
    }
//    @GetMapping("/capsule/{capsuleId}")
//    @ApiOperation(value = "캡슐 상세 페이지", notes = "캡슐의 상세한 정보를 출력한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 404, message = "페이지 오류"),
//            @ApiResponse(code = 500, message = "서버 오류"),
//    })
//    public ResponseEntity<ResponseDTO> readCapsuleDetail(@PathVariable("capsuleId") long capsuleId) {
//        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CAPSULE_INQUIRE, capsuleService.getCapsuleDetail(capsuleId)));
//    }
}