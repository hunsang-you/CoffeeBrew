package b305.coffeebrew.server.config.utils;

/**
 * 컨트롤러,필터 성공/실패 MSG
 */
public interface Msg {

	// spring security, interceptor
	String SUCCESS_SIGN_IN = "로그인에 성공하였습니다.";
	String SUCCESS_SIGN_OUT = "로그아웃에 성공하였습니다.";
	String SUCCESS_TOKEN_VALIDATE = "토큰 검증에 성공하였습니다.";
	String SUCCESS_MEMBER_ROLE = "유저 역할 확인에 성공하였습니다.";
	String SUCCESS_ACCESS = "서버 접근에 성공하였습니다.";

	String FAIL_SIGN_IN = "로그인에 실패하였습니다.";
	String FAIL_SIGN_OUT = "로그아웃에 실패하였습니다.";
	String FAIL_TOKEN_VALIDATE = "토큰 검증에 실패하였습니다.";
	String FAIL_MEMBER_ROLE = "유저 역할 확인에 실패하였습니다.";
	String FAIL_ACCESS = "서버 접근에 실패하였습니다.";
	String FAIL_UNVERIFIED_SERVER_ADDRESS = "잘못된 주소로 접근하였습니다.";

	// admin
	String SUCCESS_MEMBER_REGISTER = "회원 등록에 성공하였습니다.";
	String SUCCESS_MEMBER_MOD = "회원 정보 수정에 성공하였습니다.";
	String SUCCESS_MEMBER_MODPW = "회원 비밀번호 수정에 성공하였습니다.";

	// member
	String SUCCESS_MEMBER_PROFILE = "회원 프로필 조회에 성공하였습니다.";
	String SUCCESS_MEMBER_REVIEW= "회원 리뷰 조회에 성공하였습니다.";
	String SUCCESS_MEMBER_LIKE= "회원 좋아요 목록 조회에 성공하였습니다.";

	String SUCCESS_MEMBER_DELETE= "회원 탈퇴에 성공하였습니다.";
	String FAIL_MEMBER_DELETE= "회원 탈퇴에 실패하였습니다.";

	//reveiw
	String SUCCESS_REVIEW_REGISTER= "리뷰 등록에 성공하였습니다.";
	String FAIL_REVIEW_REGISTER= "리뷰 등록에 실패하였습니다.";

	String SUCCESS_REVIEW_GET= "리뷰 조회에 성공하였습니다.";
	String FAIL_REVIEW_GET= "리뷰 조회에 실패하였습니다.";
	
	String SUCCESS_REVIEW_MOD= "리뷰 수정에 성공하였습니다.";
	String FAIL_REVIEW_MOD= "리뷰 수정에 실패하였습니다.";

	String SUCCESS_REVIEW_DELETE= "리뷰 삭제에 성공하였습니다.";
	String FAIL_REVIEW_DEKETE= "리뷰 삭제에 실패하였습니다.";

	// bean
    String SUCCESS_BEAN_INQUIRE = "원두 상세 페이지 조회에 성공했습니다.";
	String FAIL_BEAN_INQUIRE = "원두 상세 페이지 조회에 실패했습니다.";
    String SUCCESS_CAPSULE_INQUIRE = "캡슐 상세 페이지 조회에 성공했습니다.";
	String FAIL_CAPSULE_INQUIRE = "캡슐 상세 페이지 조회에 실패했습니다.";

    String SUCCESS_BEAN_SEARCH = "원두 검색 조회에 성공했습니다.";
	String SUCCESS_CAPSULE_SEARCH = "캡슐 검색 조회에 성공했습니다.";
    String SUCCESS_LIKELIST_GETUSER = "사용자의 좋아요 리스트 조회에 성공했습니다.";
	String FAIL_LIKELIST_GETUSER = "사용자의 좋아요 리스트 조회에 실패했습니다.";

	String FAIL_BEAN_FOUND = "원두 정보가 존재하지 않습니다.";
	String FAIL_CAPSULE_FOUND = "캡슐 정보가 존재하지 않습니다.";
	String INVALID_ITEM_TYPE = "올바르지 않은 타입입니다.";
    String SUCCESS_LIKE_TOGGLE = "좋아요 추가/토글에 성공하였습니다.";
	String FAIL_LIKE_TOGGLE = "좋아요 추가/토글에 실패하였습니다.";
	String SUCCESS_LIKE_MYLIST = "나의 좋아요 리스트 호출에 성공하였습니다.";
	String FAIL_LIKE_MYLIST = "나의 좋아요 리스트 호출에 실페하였습니다.";

	String SUCCESS_ITEM_RECOM = "추천 목록 조회에 성공하였습니다.";
	String FAIL_ITEM_RECOM = "추천 목록 조회에 실패하였습니다.";

	String SUCCESS_SURVEY_REGIST = "설문 작성에 성공하였습니다.";
	String FAIL_SURVEY_REGIST = "설문 작성에 실패하였습니다.";

    String SUCCESS_SURVEY_FOUND = "설문 조회에 성공하였습니다.";
	String FAIL_SURVEY_FOUND = "설문 조회에 실패하였습니다.";
}
