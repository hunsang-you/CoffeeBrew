package b305.coffeebrew.server.exception;

public class SurveyNotFoundException extends CoffeebrewServerException {
    public SurveyNotFoundException(ErrorCode errorCode) {
        super(ErrorCode.SURVEY_NOT_FOUND);
    }
}