package com.joyride.ms.src.auth;

import com.joyride.ms.src.jwt.JwtTokenProvider;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.BaseResponseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AuthService {
    private final AuthDao authDao;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthService(AuthDao authDao, JwtTokenProvider jwtTokenProvider) {
        this.authDao = authDao;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    @Transactional
    public Integer registerRefreshToken(Integer userId, String refreshToken) {
        if(authDao.checkUser(userId))
            authDao.updateRefreshToken(userId, refreshToken);
        else
            authDao.insertRefreshToken(userId, refreshToken);

        return userId;
    }
    @Transactional
    public String createAccess(String refreshToken) throws BaseException {

        Integer userId = Integer.parseInt(jwtTokenProvider.getUseridFromRef(refreshToken));

        String newAccessToken = jwtTokenProvider.createAccessToken(userId);

        return newAccessToken;

    }
}
