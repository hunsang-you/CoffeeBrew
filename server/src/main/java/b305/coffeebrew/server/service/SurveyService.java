package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.survey.SurveyReqDTO;
import b305.coffeebrew.server.dto.survey.SurveyResDTO;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Survey;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MemberNotFoundException;
import b305.coffeebrew.server.repository.MemberRepository;
import b305.coffeebrew.server.repository.SurveyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
public class SurveyService {

    private final MemberRepository memberRepository;
    private final SurveyRepository surveyRepository;

    public SurveyService(MemberRepository memberRepository, SurveyRepository surveyRepository) {
        this.memberRepository = memberRepository;
        this.surveyRepository = surveyRepository;
    }

    public SurveyResDTO registSurvey(SurveyReqDTO surveyReqDTO, Long memberId) {

        log.info("memberId: {}", memberId);
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isEmpty()) {
            throw new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND);
        }

        Member member = memberOptional.get();
        log.info("MemberEmail: {}", member.getMemberEmail());
        Survey survey = Survey.builder()
                .param1(surveyReqDTO.getParam1())
                .param2(surveyReqDTO.getParam2())
                .param3(surveyReqDTO.getParam3())
                .param4(surveyReqDTO.getParam4())
                .param5(surveyReqDTO.getParam5())
                .param6(surveyReqDTO.getParam6())
                .param7(surveyReqDTO.getParam7())
                .param8(surveyReqDTO.getParam8())
                .expired(false)
                .flavor(0)
                .acidity(0)
                .sweetness(0)
                .bitterness(0)
                .body(0)
                .memberIdx(member)
                .build();
        return SurveyResDTO.builder()
                .param1(survey.getParam1())
                .param2(survey.getParam2())
                .param3(survey.getParam3())
                .param4(survey.getParam4())
                .param5(survey.getParam5())
                .param6(survey.getParam6())
                .param7(survey.getParam7())
                .param8(survey.getParam8())
                .expired(survey.isExpired())
                .flavor(survey.getFlavor())
                .acidity(survey.getAcidity())
                .sweetness(survey.getSweetness())
                .bitterness(survey.getBitterness())
                .body(survey.getBody())
                .build();
    }
}