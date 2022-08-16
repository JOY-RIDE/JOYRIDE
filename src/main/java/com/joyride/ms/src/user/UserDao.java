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
        String insertUserQuery = "insert into user (nickname,email,password,gender,old,bicycle_type,bicycle_career,role,provider,provider_id, terms) values (?,?,?,?,?,?,?,?,?,?,?)";
        Object[] insertUserParams = new Object[]{user.getNickname(), user.getEmail(), user.getPassword(), user.getGender(), user.getOld(),
                user.getBicycleType(),user.getBicycleCareer(),user.getRole(), user.getProvider(), user.getProvider_id(), isTermsEnable};

        this.jdbcTemplate.update(insertUserQuery, insertUserParams);

        Integer lastInsertId = this.jdbcTemplate.queryForObject("select last_insert_id()", int.class);

        user.setId(lastInsertId);

        return user;
    }

    public User selectByEmail(String email, String provider) {
        String selectByEmailQuery = "select id, nickname,email, password,gender,manner, old ,profile_img_url, introduce,bicycle_type,bicycle_career, role, provider, provider_id from user where email = ? and provider = ? and status = 1";
        Object[] selectByEmailParams = new Object[]{email, provider};
        try {
            return this.jdbcTemplate.queryForObject(selectByEmailQuery,
                    (rs, rowNum) -> new User(
                            rs.getInt("id"),
                            rs.getString("nickname"),
                            rs.getString("email"),
                            rs.getString("password"),
                            rs.getString("gender"),
                            rs.getDouble("manner"),
                            rs.getInt("old"),
                            rs.getString("profile_img_url"),
                            rs.getString("introduce"),
                            rs.getString("bicycle_type"),
                            rs.getInt("bicycle_career"),
                            rs.getString("role"),
                            rs.getString("provider"),
                            rs.getString("provider_id")),
                    selectByEmailParams);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User selectById(Integer user_id) {
        String selectByIdQuery = "select id, nickname,email, password,gender,manner, old ,profile_img_url, introduce,bicycle_type,bicycle_career, role, provider, provider_id from user where id = ? and status = 1";
        return this.jdbcTemplate.queryForObject(selectByIdQuery,
                (rs, rowNum) -> new User(
                        rs.getInt("id"),
                        rs.getString("nickname"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("gender"),
                        rs.getDouble("manner"),
                        rs.getInt("old"),
                        rs.getString("profile_img_url"),
                        rs.getString("introduce"),
                        rs.getString("bicycle_type"),
                        rs.getInt("bicycle_career"),
                        rs.getString("role"),
                        rs.getString("provider"),
                        rs.getString("provider_id")),
                user_id);
    }

    public int checkId(Integer userId) {
        String checkIdQuery = "select exists(select nickname from user where id = ? and status = 1)";
        Integer checkIdParam = userId;
        return this.jdbcTemplate.queryForObject(checkIdQuery, int.class, checkIdParam);
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

    public void updateUserStatus(Integer userId) {
        String updateStatusQuery = "update user set status = 0 where id = ?";
        Integer updateStatusParam = userId;
        this.jdbcTemplate.update(updateStatusQuery, updateStatusParam);
    }

    public void deleteRefreshToken(Integer userId) {
        String deleteRefreshTokenQuery = "delete from token where user_id = ?";
        Integer deleteRefreshTokenParam = userId;
        this.jdbcTemplate.update(deleteRefreshTokenQuery, deleteRefreshTokenParam);
    }

    public void deleteByUserStatus(String target_date) {
        String deleteByUserStatusQuery = "\n" +
                "delete from user where status = 0 and DATE_FORMAT(DATE_ADD(created_at, INTERVAL 30 DAY), '%Y-%m-%d') = ?";

        this.jdbcTemplate.update(deleteByUserStatusQuery,target_date);
    }
}
