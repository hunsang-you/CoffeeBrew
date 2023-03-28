package b305.coffeebrew.server.exception;

public class BeanNotFoundException extends CoffeebrewServerException {
    public BeanNotFoundException(ErrorCode errorCode) {
        super(ErrorCode.BEAN_NOT_FOUND);
    }
}