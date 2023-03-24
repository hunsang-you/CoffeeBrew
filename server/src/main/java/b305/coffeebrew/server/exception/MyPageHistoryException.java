package b305.coffeebrew.server.exception;

public class MyPageHistoryException extends CoffeebrewServerException {
    public MyPageHistoryException(ErrorCode errorCode) {
        super(errorCode.MYPAGE_HISTORY_ERROR);
    }
}