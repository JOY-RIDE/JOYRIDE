package com.joyride.ms.src.jwt.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static com.joyride.ms.util.BaseResponseStatus.*;

/**
 * JWT는 유효하지만 권한이 없을 때 403
 */
@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.info("403 ERROR");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write( "{" + "\"isSuccess\":false, "
                + "\"code\":\"" + INVALID_USER_JWT.getCode() + "\","
                + "\"message\":\"" + INVALID_USER_JWT.getMessage() + "\"}");
        response.getWriter().flush();
    }
}
