package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.security.auth.PrincipalDetails;
import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.dto.survey.SurveyReqDTO;
import b305.coffeebrew.server.service.SurveyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/survey")
@RequiredArgsConstructor
@Api(value = "설문 관련 API", tags = {"Survey"})
public class SurveyController {

    private static final String METHOD_NAME = b305.coffeebrew.server.controller.ItemController.class.getName();

    private final SurveyService surveyService;

    @ApiOperation(value = "원두 검색 페이지", notes = "원두의 상세한 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    @PostMapping
    public ResponseEntity<ResponseDTO> registSurvey(@RequestBody SurveyReqDTO surveyReqDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_SURVEY_REGIST, surveyService.registSurvey(surveyReqDTO, principalDetails.getMember().getIdx())));
    }
}