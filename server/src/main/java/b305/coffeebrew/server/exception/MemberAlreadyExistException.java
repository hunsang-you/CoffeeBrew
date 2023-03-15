package b305.coffeebrew.server.exception;

public class MemberAlreadyExistException extends CoffeebrewServerException {
    public MemberAlreadyExistException(ErrorCode errorCode) {
        super(errorCode.MEMBER_ALREADY_EXIST);
    }
}
