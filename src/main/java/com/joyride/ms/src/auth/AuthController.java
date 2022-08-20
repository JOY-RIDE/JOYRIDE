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
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static com.joyride.ms.util.BaseResponseStatus.*;

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
    public BaseResponse<String> singup(@Validated @RequestBody PostSignupReq postSignupReq, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
            System.out.println(errors.toString());
            return new BaseResponse<>(errors);
        }
        try {
            String encodedPassword = passwordEncoder.encode(postSignupReq.getPassword());
            User user = new User(postSignupReq.getNickname(), postSignupReq.getEmail(), encodedPassword, postSignupReq.getGender(), postSignupReq.getOld(), postSignupReq.getBicycleType(),postSignupReq.getBicycleCareer(), "ROLE_USER", "none", "none");
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
    public BaseResponse<PostSigninRes> signin(@RequestBody PostSigninReq postSigninReq, HttpServletResponse response) {
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
        Integer userId = userEntity.getUser().getId();

        Token token = jwtTokenProvider.createToken(userId);
        String accessToken = token.getAccessToken();
        String refreshToken = token.getRefreshToken();

        PostSigninRes postSigninRes = new PostSigninRes(accessToken);
        authService.registerRefreshToken(userId, refreshToken);

        ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshToken)
                .httpOnly(true)
                .path("/")
                .build();
        response.setHeader("Set-Cookie", cookie.toString());


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
    public BaseResponse<PostAutoSigninRes> signinAuto(@RequestBody PostAutoSigninReq postAutoSigninReq, HttpServletResponse response) {
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

        Integer userId = userEntity.getUser().getId();

        Token token = jwtTokenProvider.createToken(userId);
        String accessToken = token.getAccessToken();
        String refreshToken = token.getRefreshToken();
        PostAutoSigninRes postAutoSigninRes = new PostAutoSigninRes(accessToken);

        authService.registerRefreshToken(userId, refreshToken);


        ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshToken)
                .maxAge(90 * 24 *60 *60)
                .httpOnly(true)
                .path("/")
                .build();
        response.setHeader("Set-Cookie", cookie.toString());

        return new BaseResponse<>(postAutoSigninRes);
    }

    /**
     * 1.4 토큰 재발급 api
     * [GET] /auth/jwt
     * access token 만료시 재발급
     * @cookie refreshToken
     * @return accessToken
     */
    @PostMapping("/jwt")
    public BaseResponse<PostAccessRes> postAccess(@CookieValue(value = "refreshToken", required = false) String refreshToken) {

        try {
            jwtTokenProvider.AssertRefreshTokenEqualAndValid(refreshToken);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }

        try {
            String newAccessToken = authService.createAccess(refreshToken);
            PostAccessRes postAccessRes = new PostAccessRes(newAccessToken);
            return new BaseResponse<>(postAccessRes);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

    /**
     * 1.9.1 이메일 중복체크 api
     * [GET] /email?email=
     *
     * @param email
     * @return
     */
    @GetMapping("/email")
    public BaseResponse<String> getCheckEmail(@RequestParam(required = true) String email) {
        try {
            if (userProvider.checkEmail(email) == 0) { // 새 user
                return new BaseResponse<>("가능한 이메일입니다.");
            } else { // 이미 있는 유저
                return new BaseResponse<>(BaseResponseStatus.POST_USERS_EXISTS_EMAIL);
            }
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

    /**
     * 1.9.2 닉네임 중복체크 api
     * [GET] /nickname?nickname=
     *
     * @param nickname
     * @return
     */
    @GetMapping("/nickname")
    public BaseResponse<String> getCheckNickname(@RequestParam(required = true) String nickname) {
        try {
            if (userProvider.checkNickname(nickname) != 1) { // 닉네임이 중복아닌 경우
                return new BaseResponse<>("가능한 닉네임입니다.");
            } else { // 닉네임 중복
                throw new BaseException(POST_USERS_EXISTS_NICKNAME);
            }
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
