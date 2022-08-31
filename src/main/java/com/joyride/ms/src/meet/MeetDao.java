package com.joyride.ms.src.meet;

import com.joyride.ms.src.meet.dto.MeetCreateReq;
import com.joyride.ms.src.meet.dto.MeetListRes;
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
import java.util.List;
import java.util.Objects;

@Repository
public class MeetDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MeetDao(DataSource dataSource)  {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Transactional
    public Integer insertMeet(Integer userId, MeetCreateReq meetCreateReq) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        String insertMeetQuery = "INSERT INTO meet (user_id, course_id, title, local,skill, course_difficulty,gender, min_people, max_people, path, participation_fee, content, meeting_date, due_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        String insertBicycleTypeQuery = "INSERT INTO meet_bicycletype (meet_id, bicycle_type) VALUES (?,?)";

        this.jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement pstmt = con.prepareStatement(insertMeetQuery,
                        new String[]{"id"});
                pstmt.setInt(1, userId);
                pstmt.setString(2, meetCreateReq.getCourseId());
                pstmt.setString(3, meetCreateReq.getTitle());
                pstmt.setString(4, meetCreateReq.getLocal());
                pstmt.setInt(5,meetCreateReq.getSkill());
                pstmt.setInt(6,meetCreateReq.getCourseDifficulty());
                pstmt.setString(7, meetCreateReq.getGender());
                pstmt.setInt(8,meetCreateReq.getMinPeople());
                pstmt.setInt(9,meetCreateReq.getMaxPeople());
                pstmt.setString(10, meetCreateReq.getPath());
                pstmt.setInt(11,meetCreateReq.getParticipationFee());
                pstmt.setString(12, meetCreateReq.getContent());
                pstmt.setString(13, meetCreateReq.getMeetingDate());
                pstmt.setString(14, meetCreateReq.getDueDate());
                return pstmt;
            }
        }, keyHolder);
        Integer meetId = Objects.requireNonNull(keyHolder.getKey()).intValue();
        for (String bicycleType: meetCreateReq.getBicycleType()) {
            Object[] insertBicycleTypeParams = new Object[]{meetId, bicycleType};
            this.jdbcTemplate.update(insertBicycleTypeQuery, insertBicycleTypeParams);
        }

        return meetId;
    }

    public List<MeetListRes> selectMeet() {
        String selectMeetQuery = "select m.id, m.user_id, course_id, title, local, skill, course_difficulty, meeting_img_url," +
                "gender, min_people, max_people, count(j.id) as join_people, path, participation_fee, content, meeting_date," +
                "due_date, created_at from meet as m left JOIN meet_join as j ON m.id = j.meet_id\n" +
                "group by m.id";
        String selectBicycleTypeQuery = "select bicycle_type from meet_bicycletype where meet_id = ?";
        return this.jdbcTemplate.query(selectMeetQuery,
                (rs, rowNum) ->
                        new MeetListRes(
                                rs.getInt("id"),
                                rs.getInt("user_id"),
                                rs.getInt("course_id"),
                                rs.getString("title"),
                                rs.getString("local"),
                                this.jdbcTemplate.query(selectBicycleTypeQuery,
                                        (rs2,rowNum2) ->
                                                rs2.getString("bicycle_type")
                                        ,rs.getInt("id")),
                                rs.getInt("skill"),
                                rs.getInt("course_difficulty"),
                                rs.getString("meeting_img_url"),
                                rs.getString("gender"),
                                rs.getInt("min_people"),
                                rs.getInt("max_people"),
                                rs.getInt("join_people"),
                                rs.getString("path"),
                                rs.getInt("participation_fee"),
                                rs.getString("content"),
                                rs.getString("meeting_date"),
                                rs.getString("due_date"),
                                rs.getString("created_at")
                                ));
    }
}
