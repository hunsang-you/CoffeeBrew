package b305.coffeebrew.server.config.utils;

import java.util.Random;

public class RandomNumber {

	Random random = new Random();		//랜덤 함수 선언
	int createNum = 0;  				//1자리 난수
	String ranNum = ""; 				//1자리 난수 형변환 변수
	int letter    = 6;					//난수 자릿수:6
	String resultNum = "";  			//결과 난수

	public String makeRanNum() {
		for (int i=0; i<letter; i++) {

			createNum = random.nextInt(9);		//0부터 9까지 올 수 있는 1자리 난수 생성
			ranNum =  Integer.toString(createNum);  	//1자리 난수를 String으로 형변환
			resultNum += ranNum;						//생성된 난수(문자열)을 원하는 수(letter)만큼 더하며 나열
		}

		return resultNum;
	}
}
