package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.CourseInfo;
import com.joyride.ms.src.course.model.GetCourseListRes;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CourseDao {

    private final JdbcTemplate jdbcTemplate;

    public int existsCourse(String title) {
        String checkTitleQuery = "select exists(select title from course where title = ?)";
        String checkTitleParams = title;
        return this.jdbcTemplate.queryForObject(checkTitleQuery,
                int.class,
                checkTitleParams);
    }

    public List<GetCourseListRes> selectCourseList(){
        String getCourserListQuery = "select id,title,course_img_url,content,summary," +
                "tour_point, travelerinfo, distance, difficulty, sigun, required_at, created_at, updated_at from course";
        //db정보 가져오기
        return this.jdbcTemplate.query(getCourserListQuery,
                (rs,rowNum) -> GetCourseListRes.createGetCourseListRes(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("course_img_url"),
                        rs.getString("content"),
                        rs.getString("summary"),
                        rs.getString("tour_point"),
                        rs.getString("travelerinfo"),
                        rs.getDouble("distance"),
                        rs.getInt("difficulty"),
                        rs.getString("sigun"),
                        rs.getDouble("required_at"),
                        rs.getString("created_at"),
                        rs.getString("updated_at")
                ));
    }

    public void insertCourse(CourseInfo courseInfo){

        String createCourseListQuery = "insert into course (title, course_img_url, content, summary, tour_point, travelerinfo, distance, " +
                "difficulty, sigun, required_at, brdDiv) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

        Object[] createUserParams = new Object[]{courseInfo.getCrsKorNm(), courseInfo.getImage(),
                courseInfo.getCrsContents(), courseInfo.getCrsSummary(), courseInfo.getCrsTourInfo(), courseInfo.getTravelerinfo(),
                courseInfo.getCrsDstnc(), courseInfo.getCrsLevel(), courseInfo.getSigun(),
                courseInfo.getRequired_at(), courseInfo.getBrdDiv()};
        this.jdbcTemplate.update(createCourseListQuery, createUserParams);
    }


}