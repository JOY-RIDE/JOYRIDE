package com.joyride.ms.src.auth;

import com.joyride.ms.src.auth.dto.GetOauth2UserRes;
import com.joyride.ms.src.auth.dto.PostSignupOauth2Req;
import com.joyride.ms.src.auth.model.PrincipalDetails;
import com.joyride.ms.src.user.UserDao;
import com.joyride.ms.src.user.UserProvider;
import com.joyride.ms.src.user.UserService;
import com.joyride.ms.src.user.model.User;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import static com.joyride.ms.util.BaseResponseStatus.SUCCESS;

@Slf4j
@Service
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {

    private final UserProvider userProvider;
    private final UserService userService;



    @Autowired
    public PrincipalOAuth2UserService(UserProvider userProvider, UserService userService) {
        this.userProvider = userProvider;
        this.userService = userService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String name = (String) oAuth2User.getAttributes().get("name");
        String email = (String) oAuth2User.getAttributes().get("email");
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String provider_id = (String) oAuth2User.getAttributes().get("sub");

        User user = null;
        User newUser = null;

        // todo: 회원가입된 소셜계정 validate
        try {
            if (userProvider.checkEmail(email, provider) == 1)
                user = userProvider.retrieveByEmail(email, provider);
        } catch (BaseException e) {
            throw new RuntimeException(e);
        }
        if (user == null) {
            log.info("구글 로그인 최초입니다. 회원가입을 진행합니다.");
            user = new User(name,email,"", "",null,"","", provider, provider_id);
            // 여기서 회원 가입 실제로 하지 않고, 가능 여부 파악 후 클라이언트에서 /auth/signup/oauth2 api 호출하여 실제 회원가입함

            PostSignupOauth2Req postSignupOauth2Req = new PostSignupOauth2Req(email,provider,provider_id,true);

            try{
                userService.createOauth2User(postSignupOauth2Req);
                newUser = userProvider.retrieveByEmail(email, provider);
            }catch (BaseException e) {
                throw new RuntimeException(e);
            }
            return new PrincipalDetails(newUser, oAuth2User.getAttributes(), true);
        } else {
            log.info("구글 로그인 기록이 있습니다. 로그인을 진행합니다.");
            return new PrincipalDetails(user, oAuth2User.getAttributes(), false);
        }

    }



}
