package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.survey.SurveyReqDTO;
import b305.coffeebrew.server.dto.survey.SurveyResDTO;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Survey;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MemberNotFoundException;
import b305.coffeebrew.server.exception.SurveyNotFoundException;
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

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final SurveyRepository surveyRepository;

    public SurveyService(MemberService memberService, MemberRepository memberRepository, SurveyRepository surveyRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.surveyRepository = surveyRepository;
    }

    public String registSurvey(SurveyReqDTO surveyReqDTO, Long memberId) {
        log.info("memberId: {}", memberId);
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isEmpty()) {
            throw new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND);
        }

        Member member = memberOptional.get();
        log.info("MemberEmail: {}", member.getMemberEmail());

        String[] params1 = {"none", "male", "female", "other"};
        String[] params2 = {"00~00", "10~19", "20~29", "30~39", "40~49", "50~59"};
        // none, 스벅, 투썸, 파스, 이디야
        int[][] params3 = {{6, 6, 6, 6, 6}, {8, 4, 4, 9, 6}, {9, 5, 3, 7, 10}, {7, 10, 8, 6, 7}, {4, 8, 5, 6, 8}, {0, 0, 0, 0, 0}};
        // 향, 산미, 단맛, 쓴맛, 목넘김
        int[][] params4 = {{6, 6, 6, 6, 6}, {8, 0, 0, 0, 0}, {0, 8, 0, 0, 0}, {0, 0, 8, 0, 0}, {0, 0, 0, 8, 0}, {0, 0, 0, 0, 8}};
        // 아메리카노, 카페라떼, 바닐라라떼, 티
        int[][] params5 = {{6, 6, 6, 6, 6}, {12, 7, 4, 10, 9}, {7, 3, 7, 4, 11}, {8, 2, 12, 2, 6}, {11, 5, 11, 1, 4}, {0, 0, 0, 0, 0}};
        // 과일타르트, 초코케이크, 호두파이
        int[][] params6 = {{6, 6, 6, 6, 6}, {9, 5, 8, 2, 4}, {5, 1, 10, 4, 9}, {7, 0, 4, 7, 10}, {0, 0, 0, 0, 0}, {0, 0, 0, 0, 0}};
        String[] params6_note = {"", "과일, 풍부한", "초코, 부드러운", "견과류, 고소한", "", ""};
        // 사과, 복숭아, 베리, 오렌지, 바나나
        int[][] params7 = {{6, 6, 6, 6, 6}, {6, 6, 7, 2, 3}, {12, 3, 10, 3, 2}, {5, 8, 6, 9, 4}, {8, 12, 4, 6, 5}, {7, 5, 9, 4, 10}};
        String[] params7_note = {"", "사과, 배", "체리, 복숭아", "베리, 커런트", "레몬, 오렌지, 귤", "망고, 바나나, 파인애플"};
        // 우디, 시트러스, 허브, 꽃, 허니
        int[][] params8 = {{6, 6, 6, 6, 6}, {5, 1, 1, 9, 10}, {8, 10, 4, 1, 5}, {11, 2, 2, 3, 5}, {10, 3, 3, 3, 4}, {9, 0, 10, 0, 6}};
        String[] params8_note = {"", "우디", "시트러스", "허브", "플로럴", "허니"};

        String gender = params1[surveyReqDTO.getParam1()];
        String ageRange = params2[surveyReqDTO.getParam2()];

        // 설문 결과에 따른 성별, 연령대 수정
        memberService.updateAgeAndGender(ageRange, gender, memberId);

        // 스테이터스
        double[] status = {0, 0, 0, 0, 0};
        for (int i = 0; i < status.length; i++) {
            status[i] = params3[surveyReqDTO.getParam3()][i] + params4[surveyReqDTO.getParam4()][i]
                    + params5[surveyReqDTO.getParam5()][i] + params6[surveyReqDTO.getParam6()][i]
                    + params7[surveyReqDTO.getParam7()][i] + params8[surveyReqDTO.getParam8()][i];
            status[i] = status[i] / (12 * 6) * 10.0;
        }
        // 가장 큰 값 인덱스와 다음으로 큰 값 인덱스 추출
        int idx1st = 0, idx2nd = 0;
        for (int i = 0; i < status.length; i++) {
            if (status[i] > status[idx1st]) {
                idx2nd = idx1st;
                idx1st = i;
            } else if (idx1st == idx2nd || status[i] > status[idx2nd]) {

                idx2nd = i;
            }
        }
        idx1st++;
        idx2nd++;

        String[] resultTypes = {"unknown", "향미에 가치를 두는 타입", "상쾌하고 산미가 강조된 맛을 좋아하는 타입", "달콤하고 즐거운 맛을 즐기는 타입", "강하고 쓴 맛을 선호하는 타입", "풍부하고 진한 입감을 즐기는 타입"};
        String resultCode = String.valueOf(idx1st)+String.valueOf(idx2nd);
        String resultType = resultTypes[idx1st];

        // 커핑 노트
        String coffeeing_note = params6_note[surveyReqDTO.getParam6()];
        coffeeing_note = params7_note[surveyReqDTO.getParam7()].length() > 0 ? coffeeing_note + ", " + params7_note[surveyReqDTO.getParam7()] : coffeeing_note;
        coffeeing_note = params8_note[surveyReqDTO.getParam8()].length() > 0 ? coffeeing_note + ", " + params8_note[surveyReqDTO.getParam8()] : coffeeing_note;

        Optional<Survey> existingSurveyOptional = surveyRepository.findByMemberIdx(member);
        existingSurveyOptional.ifPresent(surveyRepository::delete);

        Survey survey = Survey.builder()
                .resultCode(resultCode)
                .resultType(resultType)
                .param1(surveyReqDTO.getParam1())
                .param2(surveyReqDTO.getParam2())
                .param3(surveyReqDTO.getParam3())
                .param4(surveyReqDTO.getParam4())
                .param5(surveyReqDTO.getParam5())
                .param6(surveyReqDTO.getParam6())
                .param7(surveyReqDTO.getParam7())
                .param8(surveyReqDTO.getParam8())
                .expired(false)
                .flavor((int)Math.round(status[0]))
                .acidity((int)Math.round(status[1]))
                .sweetness((int)Math.round(status[2]))
                .bitterness((int)Math.round(status[3]))
                .body((int)Math.round(status[4]))
                .coffeeing_note(coffeeing_note)
                .memberIdx(member)
                .build();
        surveyRepository.save(survey);
        return "SUCCESS";
    }

    public SurveyResDTO readMySurvey(Long memberId) {
        log.info("memberId: {}", memberId);
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        Member member = memberOptional.orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        Survey survey = surveyRepository.findByMemberIdx(member)
                .orElseThrow(() -> new SurveyNotFoundException(ErrorCode.SURVEY_NOT_FOUND));

        return SurveyResDTO.builder()
                .resultCode(survey.getResultCode())
                .resultType(survey.getResultType())
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
                .coffeeing_note(survey.getCoffeeing_note())
                .build();
    }
}