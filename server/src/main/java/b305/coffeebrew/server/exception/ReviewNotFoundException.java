package b305.coffeebrew.server.exception;

public class ReviewNotFoundException extends CoffeebrewServerException{
	public ReviewNotFoundException(ErrorCode errorCode) {
		super(errorCode.REVIEW_NOT_FOUND);
	}
}
