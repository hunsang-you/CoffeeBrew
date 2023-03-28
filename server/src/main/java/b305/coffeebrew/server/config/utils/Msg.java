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
	String SUCCESS_MEMBER_MYPAGE= "회원 마이 페이지 조회에 성공하였습니다.";

	String SUCCESS_MEMBER_DELETE= "회원 탈퇴에 성공하였습니다.";
	String FAIL_MEMBER_DELETE= "회원 탈퇴에 실패하였습니다.";

	// bean
    String SUCCESS_BEAN_INQUIRE = "원두 상세 페이지 조회에 성공했습니다.";
	String FAIL_BEAN_INQUIRE = "원두 상세 페이지 조회에 실패했습니다.";
    String SUCCESS_CAPSULE_INQUIRE = "캡슐 상세 페이지 조회에 성공했습니다.";
	String FAIL_CAPSULE_INQUIRE = "캡슐 상세 페이지 조회에 실패했습니다.";
}
