package b305.coffeebrew.server.exception;

public class PasswordNotMatchException extends CoffeebrewServerException {
    public PasswordNotMatchException(ErrorCode errorCode) {
        super(errorCode.PW_NOT_MATCH);
    }
}
