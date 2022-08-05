package com.joyride.ms.src.auth;

import com.joyride.ms.src.auth.dto.*;
import com.joyride.ms.src.auth.model.PrincipalDetails;
import com.joyride.ms.src.auth.model.Token;
import com.joyride.ms.src.jwt.JwtTokenProvider;
import com.joyride.ms.src.user.UserProvider;
import com.joyride.ms.src.user.UserService;
import com.joyride.ms.src.user.model.User;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.BaseResponse;
import com.joyride.ms.util.BaseResponseStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;

import static com.joyride.ms.util.BaseResponseStatus.SUCCESS;
import static com.joyride.ms.util.BaseResponseStatus.USERS_DISACCORD_PASSWORD;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final UserService userService;
    private final UserProvider userProvider;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthController(PasswordEncoder passwordEncoder, AuthService authService, AuthenticationManagerBuilder authenticationManagerBuilder, UserService userService, UserProvider userProvider, JwtTokenProvider jwtTokenProvider) {
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
        this.userProvider = userProvider;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * 1.1 일반 회원가입 api
     * [POST] /auth/signup
     *
     * @param postSignupReq
     * @return 결과 메세지
     */
    @PostMapping("/signup")
    public BaseResponse<String> singup(@RequestBody PostSignupReq postSignupReq) {
        try {
            String encodedPassword = passwordEncoder.encode(postSignupReq.getPassword());
            User user = new User(postSignupReq.getNickname(), postSignupReq.getEmail(), encodedPassword, postSignupReq.getGender(), postSignupReq.getOld(), postSignupReq.getBicycleType(), "ROLE_USER", "none", "none");
            userService.createUser(user, postSignupReq.isTermsEnable());
            return new BaseResponse<>(SUCCESS);
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
    }

    /**
     * 1.2 일반 로그인 api
     * [POST] /auth/signin
     *
     * @param postSigninReq
     * @return
     */
    @PostMapping("/signin")
    public BaseResponse<PostSigninRes> signin(@RequestBody PostSigninReq postSigninReq) {
        User user = null;
        try {
            user = userProvider.retrieveByEmail(postSigninReq.getEmail());
            user.setPassword(postSigninReq.getPassword());
        } catch (BaseException e) {
            return new BaseResponse(e.getStatus());
        }


        Authentication authentication = null;
        try {
            authentication = attemptAuthentication(user);
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
        PrincipalDetails userEntity = (PrincipalDetails) authentication.getPrincipal();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Long userId = userEntity.getUser().getId();
        String accessToken = jwtTokenProvider.createAccessToken(userId);
        Token token = new Token(accessToken, "");
        PostSigninRes postSigninRes = new PostSigninRes(token);

        return new BaseResponse<>(postSigninRes);
    }

    /**
     * 1.3 자동 로그인 api
     * [POST] /auth/signin/auto
     *
     * @param postAutoSigninReq
     * @return
     */
    @PostMapping("/signin/auto")
    public BaseResponse<PostAutoSigninRes> autoLogin(@RequestBody PostAutoSigninReq postAutoSigninReq) {
        User user = null;
        try {
            user = userProvider.retrieveByEmail(postAutoSigninReq.getEmail());
            user.setPassword(postAutoSigninReq.getPassword());
        } catch (BaseException e) {
            return new BaseResponse(e.getStatus());
        }

        Authentication authentication = null;
        try {
            authentication = attemptAuthentication(user);
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }

        PrincipalDetails userEntity = (PrincipalDetails) authentication.getPrincipal();

        Long userId = userEntity.getUser().getId();

        String accessToken = jwtTokenProvider.createAccessToken(userId);
        String refreshToken = jwtTokenProvider.createRefreshToken(userId);

        authService.registerRefreshToken(userId, refreshToken);

        Token token = new Token(accessToken, refreshToken);
        PostAutoSigninRes postAutoSigninRes = new PostAutoSigninRes(token);

        return new BaseResponse<>(postAutoSigninRes);
    }

     /**
     * 1.4 소셜 회원가입 api
     * [POST] /auth/signup/oauth2
     * 소셜 로그인 시도 후 새로운 유저라면 클라이언트가 약관 동의 후에
     * 이 api 호출하여 최종 회원가입
     */
    @PostMapping("/signup/oauth2")
    public BaseResponse<BaseResponseStatus> PostSignupOauth2(@RequestBody PostSignupOauth2Req postSignupOauth2Req) {
        try{
            userService.createOauth2User(postSignupOauth2Req);
            return new BaseResponse<>(SUCCESS);
        }catch(BaseException exception){
            return new BaseResponse<>(exception.getStatus());
        }
    }

    /**
     * 1.5 토큰 재발급 api
     * [GET] /auth/jwt
     * access token 만료시 재발급
     * @param postAccessReq
     * @return
     */
    @PostMapping("/jwt")
    public BaseResponse<PostAccessRes> postAccess(@RequestBody PostAccessReq postAccessReq) {
        String refreshToken = postAccessReq.getRefreshToken();
        try {
            jwtTokenProvider.AssertRefreshTokenEqualAndValid(refreshToken);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }

        try {
            Token newToken = authService.createAccess(refreshToken);
            PostAccessRes postAccessRes = new PostAccessRes(newToken);
            return new BaseResponse<>(postAccessRes);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }


    public Authentication attemptAuthentication(User user) throws BaseException{
        Collection<GrantedAuthority> userAuthorities = new ArrayList<>();
        userAuthorities.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return user.getRole();
            }
        });
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword(), userAuthorities);
        try{
            return authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        } catch (Exception e){
            throw new BaseException(USERS_DISACCORD_PASSWORD);
        }
    }
}
