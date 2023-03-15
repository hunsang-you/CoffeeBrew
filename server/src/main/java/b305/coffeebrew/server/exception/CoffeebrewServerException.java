package b305.coffeebrew.server.exception;

import lombok.Getter;

@Getter
public class CoffeebrewServerException extends RuntimeException {
    private ErrorCode errorCode;

    public CoffeebrewServerException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }


}
