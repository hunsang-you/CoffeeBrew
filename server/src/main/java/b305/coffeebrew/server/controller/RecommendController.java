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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/recom")
@RequiredArgsConstructor
@Api(value = "추천 관련 API", tags = {"Recommend"})
public class RecommendController {

    private static final String METHOD_NAME = RecommendController.class.getName();
    private final RecommendService recommendService;

    @GetMapping("/item/{itemType}/{itemId}")
    @ApiOperation(value = "아이템 기반 추천 목록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> itemRecommend(@PathVariable("itemType") String itemType, @PathVariable("itemId") long itemId) {
        return ResponseEntity.ok()
                .body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_ITEM_RECOM, recommendService.itemRecommend(itemType, itemId)));
    }

    @GetMapping("/age/{ageRange}/{itemType}")
    @ApiOperation(value = "연령대 기반 추천 목록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> recommendByAge(@PathVariable("ageRange") String ageRange, @PathVariable("itemType") String itemType) {
        return ResponseEntity.ok()
                .body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_ITEM_RECOM, recommendService.recommendByAge(ageRange, itemType)));
    }

    @GetMapping("/gender/{gender}/{itemType}")
    @ApiOperation(value = "성별 기반 원두 추천 목록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> recommendByGender(@PathVariable("gender") String gender, @PathVariable("itemType") String itemType) {
        return ResponseEntity.ok()
                .body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_ITEM_RECOM, recommendService.recommendByGender(gender, itemType)));
    }
}