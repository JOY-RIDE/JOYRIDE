package com.joyride.ms.src.jwt.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.joyride.ms.src.auth.AuthService;
import com.joyride.ms.src.auth.model.PrincipalDetails;
import com.joyride.ms.src.auth.model.Token;
import com.joyride.ms.src.jwt.JwtTokenProvider;
import com.joyride.ms.util.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthService authService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrincipalDetails oAuth2User = (PrincipalDetails) authentication.getPrincipal();
        Token token = jwtTokenProvider.createToken(oAuth2User.getUser().getId());
        String refreshToken = token.getRefreshToken();

        authService.registerRefreshToken(oAuth2User.getUser().getId(), refreshToken);

        ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshToken)
                .maxAge(90 * 24 *60 *60)
                .httpOnly(true)
                .path("/")
                .build();
        response.setHeader("Set-Cookie", cookie.toString());
        String targetUri = "http://localhost:3000";

        getRedirectStrategy().sendRedirect(request,response,targetUri);
    }
}
