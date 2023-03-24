package b305.coffeebrew.server.exception;

public class MemberNotFoundException extends CoffeebrewServerException {
    public MemberNotFoundException(ErrorCode errorCode) {
        super(errorCode.MEMBER_NOT_FOUND);
    }
}
