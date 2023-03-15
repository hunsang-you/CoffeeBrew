package b305.coffeebrew.server.exception;

import b305.coffeebrew.server.config.utils.ErrorResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Slf4j
public class CustomExceptionReturn {
    public static ResponseEntity<ErrorResponseDTO> returnException(CoffeebrewServerException e) {
        //내가 직접 커스텀한 예외일때
        log.error("{} : {}", new Object[]{e.getErrorCode(), e.getMessage()});
        ErrorCode errorCode = e.getErrorCode();
        return new ResponseEntity<>(new ErrorResponseDTO(errorCode.getStatus(), errorCode.getMessage()), HttpStatus.valueOf(errorCode.getStatus()));
    }
}
