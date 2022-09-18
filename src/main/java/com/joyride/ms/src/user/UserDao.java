package com.joyride.ms.src.user;

import com.joyride.ms.src.user.dto.PatchUserReq;
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
        String insertUserQuery = "insert into user (nickname,email,password,gender,birth_year,bicycle_type,bicycle_career,role,provider,provider_id, terms) values (?,?,?,?,?,?,?,?,?,?,?)";
        Object[] insertUserParams = new Object[]{user.getNickname(), user.getEmail(), user.getPassword(), user.getGender(), user.getBirthYear(),
                user.getBicycleType(),user.getBicycleCareer(),user.getRole(), user.getProvider(), user.getProvider_id(), isTermsEnable};

        this.jdbcTemplate.update(insertUserQuery, insertUserParams);

        Integer lastInsertId = this.jdbcTemplate.queryForObject("select last_insert_id()", int.class);

        user.setId(lastInsertId);

        return user;
    }

    public User selectByEmail(String email, String provider) {
        String selectByEmailQuery = "select id, nickname,email, password,gender,manner, birth_year ,profile_img_url, introduce,bicycle_type,bicycle_career, role, provider, provider_id from user where email = ? and provider = ? and status = 1";
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
                            rs.getInt("birth_year"),
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
        String selectByIdQuery = "select id, nickname,email, password,gender,manner, birth_year ,profile_img_url, introduce,bicycle_type,bicycle_career, role, provider, provider_id from user where id = ? and status = 1";
        return this.jdbcTemplate.queryForObject(selectByIdQuery,
                (rs, rowNum) -> new User(
                        rs.getInt("id"),
                        rs.getString("nickname"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("gender"),
                        rs.getDouble("manner"),
                        rs.getInt("birth_year"),
                        rs.getString("profile_img_url"),
                        rs.getString("introduce"),
                        rs.getString("bicycle_type"),
                        rs.getInt("bicycle_career"),
                        rs.getString("role"),
                        rs.getString("provider"),
                        rs.getString("provider_id")),
                user_id);
    }

    public String selectPasswordById(Integer userId) {
        String selectPasswordByIdQuery = "select password from user where id = ? and status = 1";
        return this.jdbcTemplate.queryForObject(selectPasswordByIdQuery, String.class, userId);

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

    public int checkProviderById(Integer userId) {
        String checkProviderByIdQuery = "select exists(select id from user where id = ? and provider = 'none')";
        Integer checkProviderByIdParam = userId;
        return this.jdbcTemplate.queryForObject(checkProviderByIdQuery, int.class, checkProviderByIdParam);
    }

    public int checkStatusDisabled(String email, String provider) {
        String checkStatusDisabledQuery = "select exists(select id from user where email = ? and provider = ? and status = 0)";
        Object[] checkStatusDisabledParams = new Object[]{email, provider};
        return this.jdbcTemplate.queryForObject(checkStatusDisabledQuery, int.class, checkStatusDisabledParams);
    }

    public int checkOtherUserNickname(Integer userId,String nickname) {
        String checkOtherUserNicknameQuery = "select exists(select nickname from user where nickname = ? and id != ?)";
        Object[] checkOtherUserNicknameParams = new Object[]{nickname, userId};
        return this.jdbcTemplate.queryForObject(checkOtherUserNicknameQuery, int.class, checkOtherUserNicknameParams);
    }

    public void updateUserStatus(Integer userId) {
        String updateStatusQuery = "update user set status = 0 where id = ?";
        Integer updateStatusParam = userId;
        this.jdbcTemplate.update(updateStatusQuery, updateStatusParam);
    }

    public void updatePasswordByEmail(String email, String encodedPassword) {
        String updatePasswordByEmailQuery = "update user set password = ? where email = ? and provider = 'none'";
        Object[] updatePasswordByEmailParams = new Object[]{encodedPassword, email};
        this.jdbcTemplate.update(updatePasswordByEmailQuery, updatePasswordByEmailParams);
    }

    public void updatePasswordById(Integer userId, String encodedPassword) {
        String updatePasswordByIdQuery = "update user set password = ? where id = ? and provider = 'none'";
        Object[] updatePasswordByIdParams = new Object[]{encodedPassword, userId};
        this.jdbcTemplate.update(updatePasswordByIdQuery, updatePasswordByIdParams);
    }

    public void updateProfile(Integer userId, PatchUserReq patchUserReq) {
        String updateProfileQuery = "update user set nickname = ?, bicycle_type = ?, bicycle_career = ?, introduce = ? where id = ? and status = 1";
        Object[] updateProfileParams = new Object[]{patchUserReq.getNickname(), patchUserReq.getBicycleType(),patchUserReq.getBicycleCareer(), patchUserReq.getIntroduce(), userId};

        this.jdbcTemplate.update(updateProfileQuery, updateProfileParams);

    }

    public String updateProfileImg(Integer userId, String profile_img_url) {
        String updateProfileImgQuery = "update user set profile_img_url = ? where id = ? and status = 1";
        Object[] updateProfileImgParams = new Object[]{profile_img_url, userId};

        this.jdbcTemplate.update(updateProfileImgQuery, updateProfileImgParams);

        return profile_img_url;
    }

    public void updateProfileImgToDefault(Integer userId) {
        String updateProfileImgToDefaultQuery = "update user set profile_img_url = 'https://bucket-joyride.s3.ap-northeast-2.amazonaws.com/profile/default-img.svg' where id = ?";
        this.jdbcTemplate.update(updateProfileImgToDefaultQuery,userId);
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
