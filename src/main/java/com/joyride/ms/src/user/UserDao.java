package com.joyride.ms.src.user;

import com.joyride.ms.src.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class UserDao {


    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }


    public User insertUser(User user, boolean isTermsEnable) {
        String insertUserQuery = "insert into user (nickname,email,password,gender,old,bicycle_type,role,provider,provider_id, terms) values (?,?,?,?,?,?,?,?,?, ?)";
        Object[] insertUserParams = new Object[]{user.getNickname(), user.getEmail(), user.getPassword(), user.getGender(), user.getOld(),
                user.getBicycleType(),user.getRole(), user.getProvider(), user.getProvider_id(), isTermsEnable};

        this.jdbcTemplate.update(insertUserQuery, insertUserParams);

        Long lastInsertId = this.jdbcTemplate.queryForObject("select last_insert_id()", Long.class);

        user.setId(lastInsertId);

        return user;
    }

    public User selectByEmail(String email, String provider) {
        String selectByEmailQuery = "select id, nickname,email, password,gender, old ,profile_img_url, introduce,bicycle_type, role, provider, provider_id from user where email = ? and provider = ? and status = 1";
        Object[] selectByEmailParams = new Object[]{email, provider};
        try {
            return this.jdbcTemplate.queryForObject(selectByEmailQuery,
                    (rs, rowNum) -> new User(
                            rs.getLong("id"),
                            rs.getString("nickname"),
                            rs.getString("email"),
                            rs.getString("password"),
                            rs.getString("gender"),
                            rs.getInt("old"),
                            rs.getString("profile_img_url"),
                            rs.getString("introduce"),
                            rs.getString("bicycle_type"),
                            rs.getString("role"),
                            rs.getString("provider"),
                            rs.getString("provider_id")),
                    selectByEmailParams);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public int checkEmail(String email, String provider) {
        String checkEmailQuery = "select exists(select email, provider from user where email = ? and provider = ?)";
        Object[] checkEmailParams = new Object[]{email, provider};
        return this.jdbcTemplate.queryForObject(checkEmailQuery, int.class, checkEmailParams);
    }

    public int checkNickname(String nickname) {
        String checkNameQuery = "select exists(select nickname from user where nickname = ?)";
        String checkNameParam = nickname;
        return this.jdbcTemplate.queryForObject(checkNameQuery, int.class, checkNameParam);
    }

    public int checkStatusDisabled(String email, String provider) {
        String checkStatusDisabledQuery = "select exists(select id from user where email = ? and provider = ? and status = 0)";
        Object[] checkStatusDisabledParams = new Object[]{email, provider};
        return this.jdbcTemplate.queryForObject(checkStatusDisabledQuery, int.class, checkStatusDisabledParams);
    }
}
