package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.service.BeanService;
import b305.coffeebrew.server.service.CapsuleService;
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
@RequestMapping(value = "/item")
@RequiredArgsConstructor
@Api(value = "원두 관련 API", tags = {"Bean"})
public class ItemController {

    private static final String METHOD_NAME = b305.coffeebrew.server.controller.ItemController.class.getName();

    private final BeanService beanService;
    private final CapsuleService capsuleService;

    @GetMapping("/bean/{beanId}")
    @ApiOperation(value = "원두 상세 페이지", notes = "원두의 상세한 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> getBeanDetail(@PathVariable("beanId") long beanId) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_BEAN_INQUIRE, beanService.getBeanDetail(beanId)));
    }

    @GetMapping("/capsule/{capsuleId}")
    @ApiOperation(value = "캡슐 상세 페이지", notes = "캡슐의 상세한 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> getCapsuleDetail(@PathVariable("capsuleId") long capsuleId) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CAPSULE_INQUIRE, capsuleService.getCapsuleDetail(capsuleId)));
    }
}