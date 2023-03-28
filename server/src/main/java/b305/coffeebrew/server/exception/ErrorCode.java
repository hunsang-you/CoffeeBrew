package b305.coffeebrew.server.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 서비스 로직에서 에러가 났을 경우 전역 ErrorCode
 */

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum ErrorCode {

    //MEMBER
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_ALREADY_EXIST(400, "이미 존재하는 회원 입니다."),
    BOOKMARK_ALREADY_EXIST(400, "이미 존재하는 즐겨찾기 입니다."),
    PW_NOT_MATCH(404, "기존 패스워드가 일치하지 않습니다."),

    //500
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류 입니다."),

    //400
    INVALID_INPUT_VALUE(400, "유효하지 않은 입력값입니다."),
    TYPE_MISMATCH(400, "타입이 맞지 않습니다."),
    MISSING_REQUEST_PARAMETER(400, "요청 파라미터를 잃어버렸습니다."),
    METHOD_NOT_ALLOWED(400, "허락되지 않은 메소드 입니다."),
    NOT_PRIMARY_KEY(400, "고유 키가 존재 하지 않습니다."),

    //end point
    MISS_MATCH_ENDPOINT(404, "해당 end point는 요청 할 수 없습니다."),
    MAX_UPLOAD_SIZE_EXCEEDED(400, "파일 용량이 초과하였습니다."),
    SOCKET_NOT_CLOSE_ERROR(500, "소켓이 정상적으로 종료되지 않았습니다."),
    MYPAGE_HISTORY_ERROR(500, "거래 내역 조회 에러입니다."),

    BEAN_NOT_FOUND(404, "원두 정보를 찾을 수 없습니다"),
    CAPSULE_NOT_FOUND(404, "캡슐 정보를 찾을 수 없습니다");

    private final int status;
    private final String message;
}
