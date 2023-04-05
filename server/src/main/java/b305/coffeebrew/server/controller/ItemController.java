package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.dto.bean.BeanDetailPageResDTO;
import b305.coffeebrew.server.dto.capsule.CapsuleDetailPageResDTO;
import b305.coffeebrew.server.dto.naverShopping.LinkDTO;
import b305.coffeebrew.server.service.BeanService;
import b305.coffeebrew.server.service.CapsuleService;
import b305.coffeebrew.server.service.NaverService;
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping(value = "/item")
@RequiredArgsConstructor
@Api(value = "원두 관련 API", tags = {"Bean"})
public class ItemController {

    private static final String METHOD_NAME = b305.coffeebrew.server.controller.ItemController.class.getName();

    private final BeanService beanService;
    private final CapsuleService capsuleService;
    private final NaverService naverService;

    @GetMapping("/bean")
    @ApiOperation(value = "원두 검색 페이지", notes = "원두의 상세한 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> findBeans(
            @RequestParam(value = "keywords", required = false) List<String> keywords,
            @PageableDefault(size = 9, page = 1) Pageable pageable) {
        return ResponseEntity.ok()
                .body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_BEAN_SEARCH, beanService.searchBeans(keywords, pageable)));
    }

    @GetMapping("/capsule")
    @ApiOperation(value = "캡슐 검색 페이지", notes = "캡슐 검색 페이지를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> findCapsule(
            @RequestParam(value = "keywords", required = false) List<String> keywords,
            @PageableDefault(size = 9, page = 1) Pageable pageable) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CAPSULE_SEARCH, capsuleService.searchCapsules(keywords, pageable)));
    }

    @GetMapping("/bean/{beanId}")
    @ApiOperation(value = "원두 상세 페이지", notes = "원두의 상세한 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> readBeanDetail(@PathVariable("beanId") long beanId) {
        BeanDetailPageResDTO beanDetailPageResDTO = beanService.getBeanDetail(beanId);
        Set<LinkDTO> naverLinks = naverService.searchNaverShopping(beanDetailPageResDTO.getNameKo(), beanDetailPageResDTO.getNameEn());
        if (naverLinks != null) {
            if (beanDetailPageResDTO.getLinkDTO() == null) {
                beanDetailPageResDTO.setLinkDTO(new HashSet<>());
            }
            beanDetailPageResDTO.getLinkDTO().addAll(naverLinks);
        }
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_BEAN_INQUIRE, beanDetailPageResDTO));
    }

    @GetMapping("/capsule/{capsuleId}")
    @ApiOperation(value = "캡슐 상세 페이지", notes = "캡슐의 상세한 정보를 출력한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "페이지 오류"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> readCapsuleDetail(@PathVariable("capsuleId") long capsuleId) {
        CapsuleDetailPageResDTO capsuleDetailPageResDTO = capsuleService.getCapsuleDetail(capsuleId);
        Set<LinkDTO> naverLinks = naverService.searchNaverShopping(capsuleDetailPageResDTO.getCapsule().getNameKo() + " 캡슐", capsuleDetailPageResDTO.getCapsule().getNameEn() + " capsule");
        if (naverLinks != null) {
            if (capsuleDetailPageResDTO.getLinkDTO() == null) {
                capsuleDetailPageResDTO.setLinkDTO(new HashSet<>());
            }
            capsuleDetailPageResDTO.getLinkDTO().addAll(naverLinks);
        }
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CAPSULE_INQUIRE, capsuleDetailPageResDTO));
    }
}