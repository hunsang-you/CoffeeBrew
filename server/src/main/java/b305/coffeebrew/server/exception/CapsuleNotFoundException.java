package b305.coffeebrew.server.exception;

public class CapsuleNotFoundException extends CoffeebrewServerException {
    public CapsuleNotFoundException(ErrorCode errorCode) {
        super(ErrorCode.CAPSULE_NOT_FOUND);
    }
}