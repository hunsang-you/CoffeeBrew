package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.security.auth.PrincipalDetails;
import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.dto.likelist.LikelistReqDTO;
import b305.coffeebrew.server.dto.likelist.LikelistResDTO;
import b305.coffeebrew.server.entity.Likelist;
import b305.coffeebrew.server.service.LikelistService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(value = "/likelist")
@RequiredArgsConstructor
@Api(value = "좋아요 API", tags = {"Likelist"})
public class LikelistController {

    private static final String METHOD_NAME = b305.coffeebrew.server.controller.ItemController.class.getName();

    private final LikelistService likelistService;

    @GetMapping("/toggle/{itemType}/{itemId}")
    public ResponseEntity<LikelistResDTO> toggleLikelist(@PathVariable String itemType, @PathVariable Long itemId,
                                                         @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(LikelistResDTO.of(likelistService.toggleLikelist(itemType, itemId, principalDetails.getMember().getIdx())));
    }

    @GetMapping("/user")
    public ResponseEntity<ResponseDTO> getLikelist(@RequestParam String itemType, @RequestParam(defaultValue = "false") boolean expired, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_LIKELIST_GETUSER, likelistService.getLikelist(itemType, principalDetails.getMember().getIdx(), expired).stream().map(LikelistResDTO::of).collect(Collectors.toList())));
    }
}