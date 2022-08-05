package com.joyride.ms.src.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthProvider {
    private final AuthDao authDao;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    public AuthProvider(AuthDao authDao, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.authDao = authDao;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @Transactional(readOnly = true)
    public boolean isRefreshTokenEqual(String token) {
        if (!authDao.checkRefreshToken(token))
            return false;

        return true;
    }
}
