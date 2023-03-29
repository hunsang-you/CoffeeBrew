package b305.coffeebrew.server.config.jwt;

import b305.coffeebrew.server.config.utils.RedisUtil;
import b305.coffeebrew.server.dto.token.CommonTokenDTO;
import b305.coffeebrew.server.dto.token.ReIssuanceTokenDTO;
import b305.coffeebrew.server.dto.token.TokenResDTO;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Date;
import java.util.Enumeration;

/**
 * generateToken() : 사번 값을 입력하여 accessToken, refreshToken 을 CommonTokenSet 으로 리턴
 * generateAccessToken() : 사번 값을 입력하여 accessToken 을 String 으로 리턴
 * getUserEmail() : accessToken 값을 입력하여 Token 안에 있는 유저의 사번을 String 으로 리턴
 * validateToken() : accessToken 검증 함수
 * requestCheckToken() : Token 이 accessToken 인지 refreshToken 인지 확인 후 TokenReqDTO 로 리턴 ... 0 : accessToken / 1 : refreshToken / 2 : 에러
 * saveRefresh() :
 * validateExistingToken() : refreshToken 검증 함수
 * updateRefresh() : refreshToken 을 새로 받아 DB에 업데이트
 */

@Slf4j
@Component
public class JwtTokenProvider {
    private static final String METHOD_NAME = JwtTokenProvider.class.getName();
    private final String headerKeyAccess;
    private final String headerKeyRefresh;
    private final String typeAccess;
    private final String typeRefresh;
    private final String secretKey;
    private final long accessValidTime;
    private final long refreshValidTime;

    @Autowired
    public JwtTokenProvider(
                            @Value(value = "${jwt.header.access}") String headerKeyAccess,
                            @Value(value = "${jwt.header.refresh}") String headerKeyRefresh,
                            @Value(value = "${jwt.type.access}") String typeAccess,
                            @Value(value = "${jwt.type.refresh}") String typeRefresh,
                            @Value(value = "${jwt.secret.key}") String secretValue,
                            @Value(value = "${jwt.time.access}") String accessValidString,
                            @Value(value = "${jwt.time.refresh}") String refreshValidString) {
        this.headerKeyAccess = headerKeyAccess;
        this.headerKeyRefresh = headerKeyRefresh;
        this.typeAccess = typeAccess;
        this.typeRefresh = typeRefresh;
        this.secretKey = Base64.getEncoder().encodeToString(secretValue.getBytes());
        this.accessValidTime = Long.parseLong(accessValidString) * 1000;
        this.refreshValidTime = Long.parseLong(refreshValidString) * 1000;
    }

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private HttpServletResponse response;

    public CommonTokenDTO generateToken(String userEmail) {
        log.info(METHOD_NAME + "- generateToken() ...");
        Date now = new Date();

        String accessToken = generateAccessToken(userEmail);
        String refreshToken = Jwts.builder()
                .setSubject(userEmail)
                .setExpiration(new Date(now.getTime() + refreshValidTime))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();

        // access token을 요청의 헤더에 담아서 보내기
        response.setHeader(headerKeyAccess, typeAccess + accessToken);

        return CommonTokenDTO.builder().accessToken(accessToken)
                .reIssuanceTokenDTO(ReIssuanceTokenDTO.builder()
                        .memberEmail(userEmail)
                        .refreshToken(refreshToken)
                        .build()).build();
    }

    public String generateAccessToken(String userEmail) {
        log.info(METHOD_NAME + "- generateAccessToken() ...");
        Date now = new Date();

        return Jwts.builder()
                .setSubject(userEmail)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessValidTime))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public String getUserEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }


    public boolean validateToken(String token) {
        log.info(METHOD_NAME + "- validateToken() ...");
        try {
            if (token == null || token.trim().isEmpty()) {
                log.error("토큰 값이 비어 있습니다. " + METHOD_NAME);
                return false;
            }
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException se) {
            log.error("잘못된 서명 " + METHOD_NAME, se);
        } catch (MalformedJwtException me) {
            log.error("잘못된 토큰 " + METHOD_NAME, me);
        } catch (ExpiredJwtException ee) {
            log.error("만료된 토큰 " + METHOD_NAME, ee);
        } catch (UnsupportedJwtException ue) {
            log.error("지원되지 않는 토큰 " + METHOD_NAME, ue);
        } catch (IllegalArgumentException ie) {
            log.error("비어있는 토큰 " + METHOD_NAME, ie);
        } catch (NullPointerException ne) {
            log.error("존재하지 않는 토큰 " + METHOD_NAME, ne);
        } catch (Exception e) {
            log.error("예기치 않은 오류 " + METHOD_NAME, e);
        }
        return false;
    }

    public TokenResDTO requestCheckToken(HttpServletRequest request) {
        log.info(METHOD_NAME + "- requestCheckToken() ...");
        try {
            String token = request.getHeader(headerKeyAccess); // 수정된 부분
            log.info("headerKeyAccess: {}", headerKeyAccess);
            log.info("token: {}", token);

            if (token != null && token.startsWith(typeAccess)) { // token이 null인 경우 처리 추가
                return TokenResDTO.builder()
                        .code(0)
                        .token(token.replace(typeAccess, ""))
                        .build();
            }
            if (token != null && token.startsWith(typeRefresh)) { // token이 null인 경우 처리 추가
                return TokenResDTO.builder()
                        .code(1)
                        .token(token.replace(typeRefresh, "")).build();
            }
        } catch (NullPointerException ne) {
            log.error("요청 값이 비어 있습니다. " + METHOD_NAME);
        } catch (Exception e) {
            log.error("SERVER ERROR " + METHOD_NAME, e);
        }
        return TokenResDTO.builder().code(2).token("").build();
    }

    public boolean saveRefresh(ReIssuanceTokenDTO reIssuanceTokenDTO) {
        log.info(METHOD_NAME + "- saveRefresh() ...");
        try {
            redisUtil.setDataExpire(reIssuanceTokenDTO.getMemberEmail(),reIssuanceTokenDTO.getRefreshToken() , refreshValidTime);
            return true;
        } catch (NullPointerException ne) {
            log.error("토큰 셋이 비어있습니다. " + METHOD_NAME, ne);
        } catch (Exception e) {
            log.error("토큰 셋 저장 실패 " + METHOD_NAME, e);
        }
        return false;
    }

    public boolean validateRefreshToken(String token) {
        log.info(METHOD_NAME + "- validateExistingToken() ...");
        try {
            if (this.validateToken(token)) {
                String userEmail = this.getUserEmail(token);
                //Redis에서 refreshToken가져오기
                String existingToken = redisUtil.getData(userEmail);
                if (existingToken.equals(token)) return true;
            }
        } catch (Exception e) {
            log.error("토큰 저장소 비교 검증 에러 " + METHOD_NAME, e);
        }
        return false;
    }

    public boolean updateRefresh(ReIssuanceTokenDTO reIssuanceTokenDTO) {
        log.info(METHOD_NAME + "- updateRefresh() ...");
        try {
            redisUtil.deleteData(reIssuanceTokenDTO.getMemberEmail());
            redisUtil.setDataExpire(reIssuanceTokenDTO.getMemberEmail(),reIssuanceTokenDTO.getRefreshToken() , refreshValidTime);
            return true;
        } catch (NullPointerException ne) {
            log.error("토큰 저장소가 비어있습니다. " + METHOD_NAME, ne);
        } catch (Exception e) {
            log.error("SERVER ERROR " + METHOD_NAME, e);
        }
        return false;
    }

    public long getRefreshValidTime() {
        return refreshValidTime;
    }

    public Cookie generateCookie(String value) {
        log.info(METHOD_NAME + "- generateCookie() ...");
        Cookie cookie = new Cookie(headerKeyRefresh, typeRefresh + value);
        cookie.setMaxAge((int) refreshValidTime);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }

//    public String getRefreshToken(String userEmail) {
//        return redisUtil.getData(userEmail);
//    }
}
