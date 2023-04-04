package b305.coffeebrew.server.config.security.interceptor;

import b305.coffeebrew.server.config.jwt.JwtTokenProvider;
import b305.coffeebrew.server.config.security.handler.DecodeEncodeHandler;
import b305.coffeebrew.server.config.security.handler.ResponseHandler;
import b305.coffeebrew.server.dto.token.TokenResDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static b305.coffeebrew.server.config.utils.Msg.*;


/**
 * 지정되지 않은 모든 URL 을 가져와 검사
 * URL 이 /admin, /emp 인지 그 외인지 검사하여 boolean 리턴
 */

@Slf4j
@Component
public class RoleInterceptor implements HandlerInterceptor {
    private static final String METHOD_NAME = RoleInterceptor.class.getName();
    private final DecodeEncodeHandler decodeEncodeHandler;
    private final JwtTokenProvider jwtTokenProvider;
    private final String adminRole;
    private final String memberRole;

    private final String adminURL;
    private final String memberURL;
    private final String itemURL;
    private final String recomURL;
    private final String reviewURL;
//    private final String likelistURL;
    private final String swaggerURL;
    private final String swaggerIndexURL;

    @Autowired
    public RoleInterceptor(DecodeEncodeHandler decodeEncodeHandler, JwtTokenProvider jwtTokenProvider,
                           @Value(value = "${user.role.admin}") String adminRole,
                           @Value(value = "${user.role.member}") String memberRole,
                           @Value(value = "${user.url.admin}") String adminURL,
                           @Value(value = "${user.url.member}") String memberURL,
                           @Value(value = "${user.url.item}") String itemURL,
                           @Value(value = "${user.url.recom}") String recomURL,
                           @Value(value = "${user.url.review}") String reviewURL,
//                           @Value(value = "${user.url.likelist}") String likelistURL,
                           @Value(value = "${user.url.test}") String testURL,
                           @Value(value = "${user.url.swagger}") String swaggerURL,
                           @Value(value = "${user.url.swagger-index}") String swaggerIndexURL) {
        this.decodeEncodeHandler = decodeEncodeHandler;
        this.jwtTokenProvider = jwtTokenProvider;
        this.adminRole = adminRole;
        this.memberRole = memberRole;
        this.adminURL = adminURL;
        this.memberURL = memberURL;
        this.itemURL = itemURL;
        this.recomURL = recomURL;
        this.reviewURL = reviewURL;
//        this.likelistURL = likelistURL;
        this.swaggerURL = swaggerURL;
        this.swaggerIndexURL = swaggerIndexURL;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info(METHOD_NAME + "- preHandle() ...");
        boolean result = false;
        log.info("SIbar request URL = {} url 위치입니다.",request.getRequestURI());
        try {
            TokenResDTO tokenResDTO = jwtTokenProvider.requestCheckToken(request);
            String token = tokenResDTO.getToken();
            Outer:
            {
                if (jwtTokenProvider.validateToken(token)) {
                    log.info("Token validate - success");
                    String memberId = jwtTokenProvider.getUserEmail(token);

                    if (decodeEncodeHandler.memberIdValid(memberId)) {
                        log.info("Member validate - Success");
                        String role = decodeEncodeHandler.roleValid(memberId);
                        if (request.getRequestURI().startsWith(adminURL)) {
                            log.info("ADMIN role validate ...");
                            if (role != null && role.equals(adminRole)) {
                                log.info("ADMIN role validate - Success");
                                result = true;
                            } else {
                                log.warn("ADMIN role validate - Fail");
                                response.setContentType("text/html; charset=UTF-8");
                                response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
                            }
                            break Outer;
                        }
                        if (request.getRequestURI().startsWith(memberURL)) {
                            log.info("MEMBER role validate ...");
                            if (role != null && (role.equals(memberRole) || role.equals(adminRole))) {
                                log.info("MEMBER role validate - Success");
                                result = true;
                            } else {
                                log.warn("MEMBER role validate - Fail");
                                response.setContentType("text/html; charset=UTF-8");
                                response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
                            }
                            break Outer;
                        }
//                        if (request.getRequestURI().startsWith(likelistURL)) {
//                            log.info("MEMBER role validate ...");
//                            if (role != null && (role.equals(memberRole) || role.equals(adminRole))) {
//                                log.info("MEMBER role validate - Success");
//                                result = true;
//                            } else {
//                                log.warn("MEMBER role validate - Fail");
//                                response.setContentType("text/html; charset=UTF-8");
//                                response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
//                            }
//                            break Outer;
//                        }
                        if (request.getRequestURI().startsWith(itemURL)) {
                            log.info("Item URL is public");
                            result = true;
                            break Outer;
                        }
                        if (request.getRequestURI().startsWith(recomURL)) {
                            log.info("Recommend URL is public");
                            result = true;
                            break Outer;
                        }
                        if (request.getRequestURI().startsWith(reviewURL)) {
                            log.info("Review URL is public");
                            result = true;
                            break Outer;
                        }
                        if (request.getRequestURI().startsWith(swaggerURL)) {
                            log.info("swagger URL is public");
                            result = true;
                            break Outer;
                        }
                        if (request.getRequestURI().startsWith(swaggerIndexURL)) {
                            log.info("swagger index URL is public");
                            result = true;
                            break Outer;
                        }
                        log.warn("Unverified role ACCESS ... ");
                        response.setContentType("text/html; charset=UTF-8");
                        response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_UNVERIFIED_SERVER_ADDRESS));
                    } else {
                        log.warn("Request User is not exist " + METHOD_NAME);
                        response.setContentType("text/html; charset=UTF-8");
                        response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
                    }
                } else {
                    if (request.getRequestURI().startsWith(itemURL)) {
                        log.info("Item URL is public");
                        result = true;
                        break Outer;
                    }
                    if (request.getRequestURI().startsWith(reviewURL)) {
                        log.info("Review URL is public");
                        result = true;
                        break Outer;
                    }
                    if (request.getRequestURI().startsWith(recomURL)) {
                        log.info("Recommend URL is public");
                        result = true;
                        break Outer;
                    }
                    if (request.getRequestURI().startsWith(swaggerURL)) {
                        log.info("swagger URL is public");
                        result = true;
                        break Outer;
                    }
                    if (request.getRequestURI().startsWith(swaggerIndexURL)) {
                        log.info("swagger URL is public");
                        result = true;
                        break Outer;
                    }
                    log.warn("Token validate - Fail");
                    response.setContentType("text/html; charset=UTF-8");
                    response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_TOKEN_VALIDATE));
                }
            }
            return result;
        } catch (IOException ie) {
            log.error("역할이 입력되지 않았습니다. " + METHOD_NAME, ie);
        } catch (NullPointerException ne) {
            log.error("역할이 존재하지 않습니다. " + METHOD_NAME, ne);
        } catch (Exception e) {
            log.error("SERVER ERROR " + METHOD_NAME, e);
        }
        return false;
    }
}