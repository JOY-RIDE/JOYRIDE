package com.joyride.ms.src.jwt.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.joyride.ms.src.auth.AuthService;
import com.joyride.ms.src.auth.dto.GetOauth2SuccessRes;
import com.joyride.ms.src.auth.dto.GetOauth2UserRes;
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

        GetOauth2SuccessRes getOauth2SuccessRes;
        if (oAuth2User.isNewUser()) { // 새로 가입한 유저
            GetOauth2UserRes getOauth2UserRes = new GetOauth2UserRes(oAuth2User.getUser().getNickname(),
                    oAuth2User.getUser().getEmail(), oAuth2User.getUser().getProvider(), oAuth2User.getUser().getProvider_id());
            getOauth2SuccessRes = new GetOauth2SuccessRes(true, getOauth2UserRes);
        } else { // 기존 유저

            Token token = jwtTokenProvider.createToken(oAuth2User.getUser().getId());
            String accessToken = token.getAccessToken();
            String refreshToken = token.getRefreshToken();

            authService.registerRefreshToken(oAuth2User.getUser().getId(), refreshToken);
            getOauth2SuccessRes = new GetOauth2SuccessRes(false, accessToken);

            ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshToken)
                    .maxAge(90 * 24 *60 *60)
                    .httpOnly(true)
                    .path("/")
                    .build();
            response.setHeader("Set-Cookie", cookie.toString());
        }
        String result = objectMapper.writeValueAsString(new BaseResponse<>(getOauth2SuccessRes));
        response.getWriter().write(result);
    }
}
