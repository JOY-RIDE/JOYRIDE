package com.joyride.ms.src.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class AuthDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public AuthDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public boolean checkUser(Long userId) {
        String checkUserQuery = "select exists(select user_id from token where user_id=?)";

        int result = this.jdbcTemplate.queryForObject(checkUserQuery, int.class, userId);

        if (result != 1)
            return false;

        return true;
    }

    public Long insertRefreshToken(Long userId, String refreshToken) {
        String insertRefreshTokenQuery = "insert into token(user_id, refresh_token) values (?,?)";
        Object[] insertRefreshTokenParams = new Object[]{userId, refreshToken};

        this.jdbcTemplate.update(insertRefreshTokenQuery, insertRefreshTokenParams);

        return userId;
    }

    public String updateRefreshToken(Long userId, String newRefreshToken) {
        String updateRefreshTokenQuery = "update token set refresh_token = ? where user_id=?";
        Object[] updateRefreshTokenParams = new Object[]{newRefreshToken,userId};

        this.jdbcTemplate.update(updateRefreshTokenQuery, updateRefreshTokenParams);

        return newRefreshToken;
    }

    public boolean checkRefreshToken(String token) {
        String checkRefreshTokenQuery = "select exists(select refresh_token from token where refresh_token = ?)";

        int result = this.jdbcTemplate.queryForObject(checkRefreshTokenQuery,int.class,token);

        if (result != 1)
            return false;

        return true;
    }
}
