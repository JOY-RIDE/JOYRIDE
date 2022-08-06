package com.joyride.ms.src.auth;

import com.joyride.ms.src.auth.model.Token;
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
    public Long registerRefreshToken(Long userId, String refreshToken) {
        if(authDao.checkUser(userId))
            authDao.updateRefreshToken(userId, refreshToken);
        else
            authDao.insertRefreshToken(userId, refreshToken);

        return userId;
    }
    @Transactional
    public Token createAccess(String refreshToken) throws BaseException {

        Long userId = Long.parseLong(jwtTokenProvider.getUseridFromRef(refreshToken));

        String newAccessToken = jwtTokenProvider.createAccessToken(userId);
        String newRefreshToken = jwtTokenProvider.createRefreshToken(userId);

        try{
            authDao.updateRefreshToken(userId, newRefreshToken);
            Token newToken = new Token(newAccessToken, newRefreshToken);
            return newToken;

        }catch(Exception e){
            e.printStackTrace();
            throw new BaseException(BaseResponseStatus.DATABASE_ERROR);
        }
    }
}
