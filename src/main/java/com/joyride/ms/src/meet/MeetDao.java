package com.joyride.ms.src.meet;

import com.joyride.ms.src.meet.dto.MeetCreateReq;
import com.joyride.ms.src.meet.dto.MeetDetailRes;
import com.joyride.ms.src.meet.dto.MeetListRes;
import com.joyride.ms.src.user.model.User;
import com.joyride.ms.src.user.model.UserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Repository
public class MeetDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MeetDao(DataSource dataSource)  {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Integer insertMeet(Integer userId, MeetCreateReq meetCreateReq, String meeting_img_url) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        String insertMeetQuery = "INSERT INTO meet (user_id, course_name, title, local,riding_skill, path_difficulty,meeting_img_url,gender, max_people, path, participation_fee, content,min_year,max_year, meeting_date, due_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        String insertBicycleTypeQuery = "INSERT INTO meet_bicycletype (meet_id, bicycle_type) VALUES (?,?)";

        this.jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement pstmt = con.prepareStatement(insertMeetQuery,
                        new String[]{"id"});
                pstmt.setInt(1, userId);
                pstmt.setString(2, meetCreateReq.getCourseName());
                pstmt.setString(3, meetCreateReq.getTitle());
                pstmt.setString(4, meetCreateReq.getLocalLocation());
                pstmt.setInt(5,meetCreateReq.getRidingSkill());
                pstmt.setInt(6,meetCreateReq.getPathDifficulty());
                pstmt.setString(7, meeting_img_url);
                pstmt.setString(8, meetCreateReq.getGender());
                pstmt.setInt(9,meetCreateReq.getMaxPeople());
                pstmt.setString(10, meetCreateReq.getPath());
                pstmt.setInt(11,meetCreateReq.getParticipationFee());
                pstmt.setString(12, meetCreateReq.getContent());
                pstmt.setInt(13, meetCreateReq.getMinBirthYear());
                pstmt.setInt(14, meetCreateReq.getMaxBirthYear());
                pstmt.setString(15, meetCreateReq.getMeetingDate());
                pstmt.setString(16, meetCreateReq.getDueDate());
                return pstmt;
            }
        }, keyHolder);

        Integer meetId = Objects.requireNonNull(keyHolder.getKey()).intValue();
        for (String bicycleType: meetCreateReq.getBicycleTypes()) {
            Object[] insertBicycleTypeParams = new Object[]{meetId, bicycleType};
            this.jdbcTemplate.update(insertBicycleTypeQuery, insertBicycleTypeParams);
        }

        return meetId;
    }

    public void insertMeetJoin(Integer userId,Integer meetId) {
        String insertMeetJoinQuery = "insert into meet_join (user_id, meet_id) values (?,?)";
        Object[] insertMeetJoinParams = new Object[]{userId, meetId};

        this.jdbcTemplate.update(insertMeetJoinQuery, insertMeetJoinParams);
    }

    public int checkMeetJoinById(Integer userId,Integer meetId) {
        String checkJoinByIdQuery = "select exists(select id from meet_join where user_id = ? and meet_id = ?)";
        Object[] checkJoinByIdParams = new Object[]{userId, meetId};
        return this.jdbcTemplate.queryForObject(checkJoinByIdQuery, int.class, checkJoinByIdParams);
    }

    public List<MeetListRes> selectMeet() {
        String selectMeetQuery = "select m.id, m.user_id, course_name, title, local, riding_skill, path_difficulty, meeting_img_url," +
                "gender, count(j.id) as join_people, max_people,path, participation_fee, content, min_year,max_year, meeting_date," +
                "due_date, created_at from meet as m left JOIN meet_join as j ON m.id = j.meet_id\n" +
                "group by m.id";
        String selectBicycleTypeQuery = "select bicycle_type from meet_bicycletype where meet_id = ?";
        return this.jdbcTemplate.query(selectMeetQuery,
                (rs, rowNum) ->
                        new MeetListRes(
                                rs.getInt("id"),
                                rs.getInt("user_id"),
                                rs.getString("course_name"),
                                rs.getString("title"),
                                rs.getString("local"),
                                rs.getInt("riding_skill"),
                                rs.getInt("path_difficulty"),
                                rs.getString("meeting_img_url"),
                                rs.getString("gender"),
                                rs.getInt("join_people"),
                                rs.getInt("max_people"),
                                Arrays.asList(rs.getString("path").split("-")),
                                rs.getInt("participation_fee"),
                                rs.getString("content"),
                                rs.getInt("min_year"),
                                rs.getInt("max_year"),
                                rs.getString("meeting_date"),
                                rs.getString("due_date"),
                                rs.getString("created_at"),
                                this.jdbcTemplate.query(selectBicycleTypeQuery,
                                        (rs2,rowNum2) ->
                                                rs2.getString("bicycle_type")
                                        ,rs.getInt("id"))
                                ));
    }

    public MeetDetailRes selectMeetById(Integer meetId) {
        String selectMeetByIdQuery = "select max_people from meet \n" +
                "where id = ?";
        String selectAdminByMeetIdQuery = "select id,nickname,manner,profile_img_url from user where id = (select user_id from meet where id = ?)";
        String selectParticipantsByMeetIdQuery = "select user.id,nickname,manner,profile_img_url from user join meet_join\n" +
                "                                          on user.id  = meet_join.user_id\n" +
                "                                          where meet_join.meet_id = ?";

        return this.jdbcTemplate.queryForObject(selectMeetByIdQuery,
                (rs, rowNum) -> new MeetDetailRes(
                        this.jdbcTemplate.queryForObject(selectAdminByMeetIdQuery,
                                (rs2,rowNum2) ->
                                        new UserDetail(
                                                rs2.getInt("id"),
                                                rs2.getString("nickname"),
                                                rs2.getDouble("manner"),
                                                rs2.getString("profile_img_url")
                                        ),meetId),
                        rs.getInt("max_people"),
                        this.jdbcTemplate.query(selectParticipantsByMeetIdQuery,
                                (rs3,rowNum3) ->
                                        new UserDetail(
                                                rs3.getInt("id"),
                                                rs3.getString("nickname"),
                                                rs3.getDouble("manner"),
                                                rs3.getString("profile_img_url")
                                        ),meetId)),
                        meetId);
    }
}
