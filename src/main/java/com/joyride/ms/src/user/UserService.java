package com.joyride.ms.src.user;

import com.joyride.ms.src.auth.dto.PatchPasswordReq;
import com.joyride.ms.src.auth.dto.PostSignupOauth2Req;
import com.joyride.ms.src.s3.dto.PostProfileImgRes;
import com.joyride.ms.src.user.dto.PatchUserReq;
import com.joyride.ms.src.user.dto.UserPasswordReq;
import com.joyride.ms.src.user.model.User;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.BaseResponseStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.Random;

import static com.joyride.ms.util.BaseResponseStatus.*;

@Slf4j
@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserProvider userProvider;
    private final UserDao userDao;

    @Autowired
    public UserService( PasswordEncoder passwordEncoder, UserProvider userProvider, UserDao userDao) {
        this.passwordEncoder = passwordEncoder;
        this.userProvider = userProvider;
        this.userDao = userDao;
    }
    @Transactional(rollbackOn = Exception.class)
    public User createUser(User user, boolean isTermsEnable) throws BaseException {

        if (userProvider.checkEmail(user.getEmail(), user.getProvider()) == 1) {
            throw new BaseException(POST_USERS_EXISTS_EMAIL);
        }
        if (userProvider.checkNickname(user.getNickname()) == 1) {
            throw new BaseException(POST_USERS_EXISTS_NICKNAME);
        }
        try {
            return this.userDao.insertUser(user, isTermsEnable);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }

    }

    @Transactional
    public PostProfileImgRes setProfileImg(Integer userId, String profile_img_url) throws BaseException {
        try {
            return new PostProfileImgRes(userId, this.userDao.updateProfileImg(userId, profile_img_url));
        } catch (Exception e) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional
    public void modifyPassword(PatchPasswordReq patchPasswordReq) throws BaseException {
        String email = patchPasswordReq.getEmail();
        //validation
        if (userProvider.checkEmail(email) != 1)
            throw new BaseException(USERS_EMPTY_USER_EMAIL);

        String encodedPassword = passwordEncoder.encode(patchPasswordReq.getNewPassword());

        try {
            userDao.updatePasswordByEmail(email, encodedPassword);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }

    }

    @Transactional
    public void modifyPasswordById(Integer userId,UserPasswordReq userPasswordReq) throws BaseException {
        //validation
        userProvider.checkPassword(userId, userPasswordReq.getOldPassword());
        String encodedPassword = passwordEncoder.encode(userPasswordReq.getNewPassword());

        try {
            userDao.updatePasswordById(userId, encodedPassword);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }

    }

    @Transactional
    public void modifyProfileImgToDefault(Integer userId) throws BaseException {
        try {
            this.userDao.updateProfileImgToDefault(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }

    }

    @Transactional
    public void modifyProfile(Integer userId, PatchUserReq patchUserReq) throws BaseException {
        if (userProvider.checkOtherUserNickname(userId,patchUserReq.getNickname()) == 1)
            throw new BaseException(POST_USERS_EXISTS_NICKNAME);
        try {
            userDao.updateProfile(userId, patchUserReq);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void removeUser(Integer userId) throws BaseException {
        if (userProvider.checkId(userId) == 0)
            throw new BaseException(USERS_EMPTY_USER_ID);
        try {
            userDao.updateUserStatus(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional
    public void removeRefreshToken(Integer userId) throws BaseException {
        if (userProvider.checkId(userId) == 0)
            throw new BaseException(USERS_EMPTY_USER_ID);
        try {
            userDao.deleteRefreshToken(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional
    public void removeUserExpired(String targetDate) throws BaseException {
        try {
            userDao.deleteByUserStatus(targetDate);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional
    public void createOauth2User(PostSignupOauth2Req postSignupOauth2Req) throws BaseException {
        // provider가 "google" 인지
        if (!userProvider.isProviderCorrect(postSignupOauth2Req.getProvider())) {
            throw new BaseException(BaseResponseStatus.INVALID_PROVIDER);
        }
        String nickname = generateRandomNickname();
        while (userProvider.checkNickname(nickname) == 1) {
            nickname = generateRandomNickname();
        }
        String password = passwordEncoder.encode(postSignupOauth2Req.getProviderId());
        User user = new User(nickname, postSignupOauth2Req.getEmail(),
                password,"",null,"",null, "ROLE_USER", postSignupOauth2Req.getProvider(), postSignupOauth2Req.getProviderId());
        createUser(user, postSignupOauth2Req.isTermsEnable());
    }

    private String generateRandomNickname() {
        // 아스키 코드 48 ~ 122까지 랜덤 문자
        // 예: qOji6mPStx
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int maxNicknameLength = 10; // 닉네임 길이 최대 10자
        Random random = new Random();
        String nickname = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)) // 아스키코드 숫자 알파벳 중간에 섞여있는 문자들 제거
                .limit(maxNicknameLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return nickname;
    }
}
