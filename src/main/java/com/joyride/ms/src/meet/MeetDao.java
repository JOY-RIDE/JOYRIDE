package com.joyride.ms.src.meet;

import com.joyride.ms.src.meet.dto.MeetCreateReq;
import com.joyride.ms.src.meet.dto.MeetDetailRes;
import com.joyride.ms.src.meet.dto.MeetFilterReq;
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
        String insertMeetQuery = "INSERT INTO meet (user_id, course_name, title, local,riding_skill, path_difficulty,meeting_img_url,gender, max_people, path, participation_fee, content,min_year,max_year,gathering_place, meeting_date, due_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
                pstmt.setString(15, meetCreateReq.getGatheringPlace());
                pstmt.setString(16, meetCreateReq.getMeetingDate());
                pstmt.setString(17, meetCreateReq.getDueDate());
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

    public void insertMeetBookMark(Integer userId,Integer meetId) {
        String insertMeetJoinQuery = "insert into meet_bookmark (user_id, meet_id) values (?,?)";
        Object[] insertMeetJoinParams = new Object[]{userId, meetId};

        this.jdbcTemplate.update(insertMeetJoinQuery, insertMeetJoinParams);
    }

    public int checkMeetJoinById(Integer userId,Integer meetId) {
        String checkJoinByIdQuery = "select exists(select meet_join.id from meet_join join meet on meet_join.meet_id = meet.id where meet_join.user_id = ? and meet_join.meet_id = ? or meet.id = ?)";
        Object[] checkJoinByIdParams = new Object[]{userId, meetId, meetId};
        return this.jdbcTemplate.queryForObject(checkJoinByIdQuery, int.class, checkJoinByIdParams);
    }

    public int checkMeetById(Integer userId,Integer meetId) {
        String checkMeetByIdQuery = "select exists(select id from meet where user_id = ? and id = ?)";
        Object[] checkMeetByIdParams = new Object[]{userId, meetId};
        return this.jdbcTemplate.queryForObject(checkMeetByIdQuery, int.class, checkMeetByIdParams);
    }

    public int checkMeetStatus(Integer meetId) {
        String checkMeetStatusQuery = "select exists(select id from meet where  id = ? and status = 1)";
        Integer checkMeetStatusParam = meetId;
        return this.jdbcTemplate.queryForObject(checkMeetStatusQuery, int.class, checkMeetStatusParam);
    }

    public int checkMeetGender(String gender, Integer meetId) {
        String checkMeetGenderQuery = "select exists(select id from meet where gender in (?,'mixed') and id = ?)";
        Object[] checkMeetGenderParam = new Object[]{gender,meetId};
        return this.jdbcTemplate.queryForObject(checkMeetGenderQuery, int.class, checkMeetGenderParam);
    }

    public int checkMeetBirth(Integer birthYear, Integer meetId) {
        String checkMeetBirthQuery = "select exists(select meet.id from meet where "+ birthYear+ " >= min_year and "+ birthYear+" <= max_year and id=?)";
        Integer checkMeetBirthParam = meetId;
        return this.jdbcTemplate.queryForObject(checkMeetBirthQuery, int.class, checkMeetBirthParam);
    }

    public int checkMeetFull(Integer meetId) {
        String checkMeetMaxPeopleQuery = "select max_people from meet where id = ?";
        Integer checkMeetMaxPeopleParam = meetId;

        String checkMeetJoinPeopleQuery = "select count(meet_join.id) from meet_join where meet_id = ?";
        Integer checkMeetJoinPeopleParam = meetId;

        Integer maxPeople = this.jdbcTemplate.queryForObject(checkMeetMaxPeopleQuery, int.class, checkMeetMaxPeopleParam);
        Integer joinPeople = this.jdbcTemplate.queryForObject(checkMeetJoinPeopleQuery, int.class, checkMeetJoinPeopleParam);

        if (maxPeople == joinPeople)
            return 1;
        return 0;
    }

    public int checkMeetBookMark(Integer userId, Integer meetId) {
        String checkMeetBookMarkQuery = "select exists(select id from meet_bookmark where  user_id = ? and meet_id = ?)";
        Object[] checkMeetBookMarkParam = new Object[]{userId,meetId};

        return this.jdbcTemplate.queryForObject(checkMeetBookMarkQuery, int.class, checkMeetBookMarkParam);
    }

    public MeetDetailRes selectMeetById(Integer meetId) {
        String selectMeetByIdQuery = "select m.id, m.user_id, course_name, title, local, riding_skill, path_difficulty, meeting_img_url," +
                "gender, count(j.id) as join_people, max_people,path, participation_fee, content, min_year,max_year,gathering_place,status, meeting_date," +
                "due_date, created_at from meet as m left JOIN meet_join as j ON m.id = j.meet_id\n" +
                "where m.id = ?";
        String selectBicycleTypeQuery = "select bicycle_type from meet_bicycletype where meet_id = ?";
        String selectAdminByMeetIdQuery = "select id,nickname,manner,profile_img_url from user where id = (select user_id from meet where id = ?)";
        String selectParticipantsByMeetIdQuery = "select user.id,nickname,manner,profile_img_url from user join meet_join\n" +
                "                                          on user.id  = meet_join.user_id\n" +
                "                                          where meet_join.meet_id = ?";

        return this.jdbcTemplate.queryForObject(selectMeetByIdQuery,
                (rs, rowNum) -> new MeetDetailRes(
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
                        Arrays.asList(rs.getString("path").split(",")),
                        rs.getInt("participation_fee"),
                        rs.getString("content"),
                        rs.getInt("min_year"),
                        rs.getInt("max_year"),
                        rs.getString("gathering_place"),
                        rs.getInt("status"),
                        rs.getString("meeting_date"),
                        rs.getString("due_date"),
                        rs.getString("created_at"),
                        this.jdbcTemplate.query(selectBicycleTypeQuery,
                                (rs2,rowNum2) ->
                                        rs2.getString("bicycle_type")
                                ,rs.getInt("id")),
                        this.jdbcTemplate.queryForObject(selectAdminByMeetIdQuery,
                                (rs3,rowNum3) ->
                                        new UserDetail(
                                                rs3.getInt("id"),
                                                rs3.getString("nickname"),
                                                rs3.getDouble("manner"),
                                                rs3.getString("profile_img_url")
                                        ),meetId),
                        this.jdbcTemplate.query(selectParticipantsByMeetIdQuery,
                                (rs4,rowNum4) ->
                                        new UserDetail(
                                                rs4.getInt("id"),
                                                rs4.getString("nickname"),
                                                rs4.getDouble("manner"),
                                                rs4.getString("profile_img_url")
                                        ),meetId)),
                        meetId);
    }

    public List<MeetListRes> selectMeetByFilter(MeetFilterReq meetFilterReq) {
        StringBuffer selectMeetFilterQuery = new StringBuffer();
        selectMeetFilterQuery.append("select DISTINCT m.id, m.user_id, course_name, title, local, riding_skill, path_difficulty, meeting_img_url," +
                "gender, count(j.id) as join_people, max_people,path, participation_fee, content, min_year,max_year,gathering_place,status, meeting_date," +
                "due_date, created_at from meet as m left JOIN meet_join as j ON m.id = j.meet_id Join meet_bicycletype as b ON m.id = b.meet_id where 1=1 group by b.id order by b.id DESC");

        selectMeetFilterQuery = meetFilter(selectMeetFilterQuery,meetFilterReq);
        String selectBicycleTypeQuery = "select bicycle_type from meet_bicycletype where meet_id = ?";

        return this.jdbcTemplate.query(selectMeetFilterQuery.toString(),
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
                                Arrays.asList(rs.getString("path").split(",")),
                                rs.getInt("participation_fee"),
                                rs.getString("content"),
                                rs.getInt("min_year"),
                                rs.getInt("max_year"),
                                rs.getString("gathering_place"),
                                rs.getInt("status"),
                                rs.getString("meeting_date"),
                                rs.getString("due_date"),
                                rs.getString("created_at"),
                                this.jdbcTemplate.query(selectBicycleTypeQuery,
                                        (rs2,rowNum2) ->
                                                rs2.getString("bicycle_type")
                                        ,rs.getInt("id"))
                        ));
    }

    public List<MeetListRes> selectMeetByHost(Integer userId) {
        String selectMeetByHostQuery = "select m.id, m.user_id, course_name, title, local, riding_skill, path_difficulty, meeting_img_url," +
                "gender, count(j.id) as join_people, max_people,path, participation_fee, content, min_year,max_year,gathering_place,status, meeting_date," +
                "due_date, created_at from meet as m left JOIN meet_join as j ON m.id = j.meet_id where m.user_id = ? group by m.id order by m.id DESC";
        String selectBicycleTypeQuery = "select bicycle_type from meet_bicycletype where meet_id = ?";

        return this.jdbcTemplate.query(selectMeetByHostQuery,
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
                                Arrays.asList(rs.getString("path").split(",")),
                                rs.getInt("participation_fee"),
                                rs.getString("content"),
                                rs.getInt("min_year"),
                                rs.getInt("max_year"),
                                rs.getString("gathering_place"),
                                rs.getInt("status"),
                                rs.getString("meeting_date"),
                                rs.getString("due_date"),
                                rs.getString("created_at"),
                                this.jdbcTemplate.query(selectBicycleTypeQuery,
                                        (rs2,rowNum2) ->
                                                rs2.getString("bicycle_type")
                                        ,rs.getInt("id"))
                        ),userId);
    }

    public List<MeetListRes> selectMeetByJoin(Integer userId) {
        String selectMeetByHostQuery = "select m.id, m.user_id, course_name, title, local, riding_skill, path_difficulty, meeting_img_url," +
                "gender, count(j.id) as join_people, max_people,path, participation_fee, content, min_year,max_year,gathering_place,status, meeting_date," +
                "due_date, created_at from meet as m left JOIN meet_join as j ON m.id = j.meet_id where j.user_id = ? group by m.id order by m.id DESC";
        String selectBicycleTypeQuery = "select bicycle_type from meet_bicycletype where meet_id = ?";

        return this.jdbcTemplate.query(selectMeetByHostQuery,
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
                                Arrays.asList(rs.getString("path").split(",")),
                                rs.getInt("participation_fee"),
                                rs.getString("content"),
                                rs.getInt("min_year"),
                                rs.getInt("max_year"),
                                rs.getString("gathering_place"),
                                rs.getInt("status"),
                                rs.getString("meeting_date"),
                                rs.getString("due_date"),
                                rs.getString("created_at"),
                                this.jdbcTemplate.query(selectBicycleTypeQuery,
                                        (rs2,rowNum2) ->
                                                rs2.getString("bicycle_type")
                                        ,rs.getInt("id"))
                        ),userId);
    }

    public List<MeetListRes> selectMeetByBookMark(Integer userId) {
        String selectMeetByHostQuery = "select m.id, m.user_id, course_name, title, local, riding_skill, path_difficulty, meeting_img_url," +
                "gender, count(j.id) as join_people, max_people,path, participation_fee, content, min_year,max_year,gathering_place,status, meeting_date," +
                "due_date, created_at from meet as m left JOIN meet_join as j ON m.id = j.meet_id join  meet_bookmark as b on m.id = b.meet_id where b.user_id = ?  group by m.id order by m.id DESC";
        String selectBicycleTypeQuery = "select bicycle_type from meet_bicycletype where meet_id = ?";

        return this.jdbcTemplate.query(selectMeetByHostQuery,
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
                                Arrays.asList(rs.getString("path").split(",")),
                                rs.getInt("participation_fee"),
                                rs.getString("content"),
                                rs.getInt("min_year"),
                                rs.getInt("max_year"),
                                rs.getString("gathering_place"),
                                rs.getInt("status"),
                                rs.getString("meeting_date"),
                                rs.getString("due_date"),
                                rs.getString("created_at"),
                                this.jdbcTemplate.query(selectBicycleTypeQuery,
                                        (rs2,rowNum2) ->
                                                rs2.getString("bicycle_type")
                                        ,rs.getInt("id"))
                        ),userId);
    }

    public void deleteMeetJoin(Integer userId, Integer meetId) {
        String deleteMeetJoinQuery = "delete from meet_join where user_id = ? and meet_id = ?";
        Object[] deleteMeetJoinParam = new Object[]{userId, meetId};
        this.jdbcTemplate.update(deleteMeetJoinQuery, deleteMeetJoinParam);
    }

    public void deleteMeet(Integer meetId) {
        String deleteMeetQuery = "update meet set status = 0 where id = ?";
        Integer deleteMeetParam = meetId;
        this.jdbcTemplate.update(deleteMeetQuery, deleteMeetParam);
    }

    public void deleteMeetBookMark(Integer userId, Integer meetId) {
        String deleteMeetBookMarkQuery = "delete from meet_bookmark  where user_id = ? and meet_id = ?";
        Object[] deleteMeetBookMarkParam = new Object[]{userId, meetId};
        this.jdbcTemplate.update(deleteMeetBookMarkQuery, deleteMeetBookMarkParam);
    }

    public StringBuffer meetFilter(StringBuffer selectMeetFilterQuery,MeetFilterReq meetFilterReq) {
        if (meetFilterReq.getAge() != null) {
            switch (meetFilterReq.getAge()) {
                case 1:
                    selectMeetFilterQuery.insert(381,"AND CAST(min_year AS char) >= DATE_FORMAT(DATE_SUB(now(), INTERVAL 18 YEAR), '%Y') ");
                    break;
                case 2:
                    selectMeetFilterQuery.insert(381,"AND CAST(max_year AS char) <= DATE_FORMAT(DATE_SUB(now(), INTERVAL 19 YEAR), '%Y') AND CAST(min_year AS char) >= DATE_FORMAT(DATE_SUB(now(), INTERVAL 28 YEAR), '%Y') ");
                    break;
                case 3:
                    selectMeetFilterQuery.insert(381,"AND CAST(max_year AS char) <= DATE_FORMAT(DATE_SUB(now(), INTERVAL 29 YEAR), '%Y') AND CAST(min_year AS char) >= DATE_FORMAT(DATE_SUB(now(), INTERVAL 38 YEAR), '%Y') ");
                    break;
                case 4:
                    selectMeetFilterQuery.insert(381,"AND CAST(max_year AS char) <= DATE_FORMAT(DATE_SUB(now(), INTERVAL 39 YEAR), '%Y') AND CAST(min_year AS char) >= DATE_FORMAT(DATE_SUB(now(), INTERVAL 48 YEAR), '%Y') ");
                    break;
                case 5:
                    selectMeetFilterQuery.insert(381,"AND CAST(max_year AS char) <= DATE_FORMAT(DATE_SUB(now(), INTERVAL 49 YEAR), '%Y') ");
                    break;
            }
        }
        if(meetFilterReq.getBicycleTypes() != null) {
            selectMeetFilterQuery.insert(381,"AND b.bicycle_type = '"+ meetFilterReq.getBicycleTypes()+"' ");
        }
        if(meetFilterReq.getGender() != null) {
            selectMeetFilterQuery.insert(381, "AND gender = '"+ meetFilterReq.getGender()+"' ");
        }
        if(meetFilterReq.getLocation() != null) {
            selectMeetFilterQuery.insert(381, "AND local = '"+ meetFilterReq.getLocation()+"' ");
        }
        if(meetFilterReq.getMaxNumOfParticipants() != null) {
            selectMeetFilterQuery.insert(381, "AND max_people <= "+ meetFilterReq.getMaxNumOfParticipants()+" ");
        }
        if(meetFilterReq.getMinNumOfParticipants() != null) {
            selectMeetFilterQuery.insert(381, "AND max_people >= "+ meetFilterReq.getMinNumOfParticipants()+" ");
        }
        if(meetFilterReq.getParticipationFee() != null) {
            if(meetFilterReq.getParticipationFee() == 0){
                selectMeetFilterQuery.insert(381,"AND participation_fee = 0 ");

            }
            else{
                selectMeetFilterQuery.insert(381,"AND participation_fee != 0 ");
            }
        }
        if(meetFilterReq.getPathDifficulty() != null) {
            selectMeetFilterQuery.insert(381, "AND path_difficulty = " + meetFilterReq.getPathDifficulty() +" ");
        }
        if(meetFilterReq.getRidingSkill() != null) {
            selectMeetFilterQuery.insert(381, "AND riding_skill = " + meetFilterReq.getRidingSkill() +" ");
        }
        return selectMeetFilterQuery;
    }
}
