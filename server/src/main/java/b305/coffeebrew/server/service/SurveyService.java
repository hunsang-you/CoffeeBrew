package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.survey.SurveyReqDTO;
import b305.coffeebrew.server.dto.survey.SurveyResDTO;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Survey;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MemberNotFoundException;
import b305.coffeebrew.server.repository.MemberRepository;
import b305.coffeebrew.server.repository.SurveyRepository;

public class SurveyService {

    private final MemberRepository memberRepository;
    private final SurveyRepository surveyRepository;

    public SurveyService(MemberRepository memberRepository, SurveyRepository surveyRepository) {
        this.memberRepository = memberRepository;
        this.surveyRepository = surveyRepository;
    }

    public SurveyResDTO registSurvey(SurveyReqDTO surveyReqDTO, Long memberId) {

        Member member = memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            throw new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND);
        }

        Survey survey = Survey.builder()
                .param1(surveyReqDTO.getParam1())
                .param2(surveyReqDTO.getParam2())
                .param3(surveyReqDTO.getParam3())
                .param4(surveyReqDTO.getParam4())
                .param5(surveyReqDTO.getParam5())
                .param6(surveyReqDTO.getParam6())
                .param7(surveyReqDTO.getParam7())
                .param8(surveyReqDTO.getParam8())
                .expired(surveyReqDTO.isExpired())
                .memberIdx(member)
                .build();
        return SurveyResDTO.of("0000", "SUCCESS", surveyRepository.save(survey).getParam1(),
                survey.getParam2(), survey.getParam3(), survey.getParam4(), survey.getParam5(), survey.getParam6(),
                survey.getParam7(), survey.getParam8(), survey.isExpired());
    }
}
