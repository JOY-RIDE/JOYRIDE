package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.CourseInfo;
import com.joyride.ms.src.course.model.GetCourseListRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class CourseDao {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    // 일단은 해당 이름을 가진 값이 있는지 확인해서 db에 정보가 있는지 없는지 확인하게 해놨는데 더 좋은 방법이 있을 것 같습니다.
    public int checkCourse(String title) {
        String checkTitleQuery = "select exists(select title from course where title = ?)";
        String checkTitleParams = title;
        return this.jdbcTemplate.queryForObject(checkTitleQuery,
                int.class,
                checkTitleParams);
    }

    public List<GetCourseListRes> getCourseList(){
        String getCourserListQuery = "select id,title,course_img_url,content,summary," +
                "tour_point, total_rate, distance, difficulty, required_at, created_at, updated_at from course";
        //db정보 가져오기
        return this.jdbcTemplate.query(getCourserListQuery,
                (rs,rowNum) -> new GetCourseListRes(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("course_img_url"),
                        rs.getString("content"),
                        rs.getString("summary"),
                        rs.getString("tour_point"),
                        rs.getDouble("total_rate"),
                        rs.getDouble("distance"),
                        rs.getInt("difficulty"),
                        rs.getString("sigun"),
                        rs.getString("required_at"),
                        rs.getString("created_at"),
                        rs.getString("updated_at")
                ),"");
    }

    public void createCourseList(CourseInfo courseInfo){

        String createCourseListQuery = "insert into course (title, course_img_url, content, summary, tour_point, distance, " +
                "difficulty, sigun, required_at, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

        Object[] createUserParams = new Object[]{courseInfo.getCrsKorNm(), courseInfo.getImage(),
                courseInfo.getCrsContents(), courseInfo.getCrsSummary(), courseInfo.getCrsTourInfo(), courseInfo.getCrsDstnc(),
                courseInfo.getCrsLevel(), courseInfo.getSigun(), courseInfo.getRequired_at(), courseInfo.getCreated_at(),
                courseInfo.getUpdated_at()};
        this.jdbcTemplate.update(createCourseListQuery, createUserParams);
    }


}
