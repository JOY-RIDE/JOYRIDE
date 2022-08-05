package com.joyride.ms.src.user;

import com.joyride.ms.src.user.model.User;
import com.joyride.ms.util.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.joyride.ms.util.BaseResponseStatus.*;

@Slf4j
@Service
public class UserProvider {
    private final UserDao userDao;

    @Autowired
    public UserProvider(UserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * 기본적으로 email로 유저를 확인할 때는 항상 provider와 같이 확인
     * email을 이용하여 확인할 때 provider 파라미터가 주어지지 않는다면
     * 일반 회원가입한 유저(provider=="none")가 있는 지 체크하게 된다.
     *
     * @param email
     * @return int 0 or 1
     * @throws BaseException
     */

    public User retrieveByEmail(String email) throws BaseException {
        return retrieveByEmail(email, "none");
    }

    @Transactional(readOnly = true)
    public User retrieveByEmail(String email, String provider) throws BaseException {
        if (checkStatusDisabled(email,provider)) {
            throw new BaseException(USERS_DELETED_USER);
        }
        if (checkEmail(email, provider) == 0)
            throw new BaseException(USERS_EMPTY_USER_EMAIL);
        try {
            return userDao.selectByEmail(email, provider);
        } catch (Exception e) {
            throw new BaseException(DATABASE_ERROR);
        }

    }

    public int checkEmail(String email) throws BaseException {
        return checkEmail(email, "none");
    }

    @Transactional(readOnly = true)
    public int checkEmail(String email, String provider) throws BaseException {
        try {
            return userDao.checkEmail(email, provider);
        } catch (Exception exception) {
            log.warn(exception.getMessage());
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional(readOnly = true)
    public int checkNickname(String nickname) throws BaseException {
        try {
            return userDao.checkNickname(nickname);
        } catch (Exception exception) {
            log.warn(exception.getMessage());
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public boolean isProviderCorrect(String provider) {
        return (provider.equals("google"));
    }

    @Transactional(readOnly = true)
    public boolean checkStatusDisabled(String email, String provider) throws BaseException {
        try {
            if (userDao.checkStatusDisabled(email, provider) == 0)
                return false;
            else
                return true;
        } catch (Exception e) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
