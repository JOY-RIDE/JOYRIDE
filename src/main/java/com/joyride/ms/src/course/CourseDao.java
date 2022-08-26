package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.CourseInfo;
import com.joyride.ms.src.course.model.GetCourseListRes;
import com.joyride.ms.src.course.model.GetCourseReviewRes;
import com.joyride.ms.src.course.model.PostCourseReviewReq;
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

        Object[] createCourseListParams = new Object[]{courseInfo.getCrsKorNm(), courseInfo.getImage(),
                courseInfo.getCrsContents(), courseInfo.getCrsSummary(), courseInfo.getCrsTourInfo(), courseInfo.getTravelerinfo(),
                courseInfo.getCrsDstnc(), courseInfo.getCrsLevel(), courseInfo.getSigun(),
                courseInfo.getRequired_at(), courseInfo.getBrdDiv()};
        this.jdbcTemplate.update(createCourseListQuery, createCourseListParams);
    }

    // 리뷰 생성 Dao
    public int insertCourseReview(PostCourseReviewReq postCourseReviewReq, double totalRate){

        String insertCourseReviewQuery = "insert into courseReview (user_id, course_id, total_rate, scene_rate, facilities_rate, " +
                "safety_rate, accessibility_rate, total_review, scene_review, facilities_review, safety_review, accessibility_review) " +
                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

        Object[] insertCourseReviewParams = new Object[]{postCourseReviewReq.getUser_id(), postCourseReviewReq.getCourse_id(),
                totalRate, postCourseReviewReq.getScene_rate(), postCourseReviewReq.getFacilities_rate(), postCourseReviewReq.getSafety_rate(),
                postCourseReviewReq.getAccessibility_rate(), postCourseReviewReq.getTotal_review(), postCourseReviewReq.getScene_review(),
                postCourseReviewReq.getFacilities_review(), postCourseReviewReq.getSafety_review(), postCourseReviewReq.getAccessibility_review()};

        this.jdbcTemplate.update(insertCourseReviewQuery, insertCourseReviewParams);

        // 마지막으로 insert 된 id 리턴
        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery,int.class);
    }

    // 코스 리뷰 조회
    public List<GetCourseReviewRes> selectCourseReviewByCourseId(int course_id){
        String selectCourseReviewQuery = "select CR.id, U.nickname, CR.user_id, course_id, total_rate, scene_rate, facilities_rate,safety_rate, accessibility_rate,\n" +
                "       total_review, scene_review, facilities_review, safety_review,accessibility_review,\n" +
                "       CR.created_at, CR.updated_at from coursereview CR\n" +
                "                              INNER join user U\n" +
                "                                    on CR.user_id = U.id\n" +
                "    where course_id=?";


        int selectCourseReviewParams = course_id;
        //db정보 가져오기
        return this.jdbcTemplate.query(selectCourseReviewQuery,
                (rs,rowNum) -> new GetCourseReviewRes(
                        rs.getInt("id"),
                        rs.getString("nickname"),
                        rs.getInt("user_id"),
                        rs.getInt("course_id"),
                        rs.getDouble("total_rate"),
                        rs.getDouble("scene_rate"),
                        rs.getDouble("facilities_rate"),
                        rs.getDouble("safety_rate"),
                        rs.getDouble("accessibility_rate"),
                        rs.getString("total_review"),
                        rs.getString("scene_review"),
                        rs.getString("facilities_review"),
                        rs.getString("safety_review"),
                        rs.getString("accessibility_review"),
                        rs.getString("created_at"),
                        rs.getString("updated_at")),
                selectCourseReviewParams);
    }

    // 코스 리뷰 삭제
    public void deleteByCourseReviewId(int courseReview_id){

        String deleteByCourseReviewIdQuery = "delete from coursereview where id = ?";
        int deleteByCourseReviewIdParams = courseReview_id;

        this.jdbcTemplate.update(deleteByCourseReviewIdQuery, deleteByCourseReviewIdParams);
    }

    public int existsCourseReview(int courseReview_id) {
        String existsCourseReviewQuery = "select exists(select id from coursereview where id = ?)";
        int existsCourseReviewParams = courseReview_id;
        return this.jdbcTemplate.queryForObject(existsCourseReviewQuery,
                int.class,
                existsCourseReviewParams);
    }

    /**
     * 코스 좋아요
     */
    public int insertCourseLike(int user_id, int course_id){

        String createCourseLikeQuery = "insert into courselike (user_id, course_id) VALUES (?,?)";

        Object[] createCourseLikeParams = new Object[]{user_id, course_id};
        this.jdbcTemplate.update(createCourseLikeQuery, createCourseLikeParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery,int.class);
    }

    //좋아요 삭제

    public void deleteByCourseLikeId(int courseLike_id){

        String deleteByCourseLikeIdQuery = "delete from courselike where id = ?";
        int deleteByCourseLikeIdParams = courseLike_id;

        this.jdbcTemplate.update(deleteByCourseLikeIdQuery, deleteByCourseLikeIdParams);
    }

    public int existsCourseLike(int courseLike_id) {
        String existsCourseLikeQuery = "select exists(select id from courselike where id = ?)";
        int existsCourseLikeParams = courseLike_id;
        return this.jdbcTemplate.queryForObject(existsCourseLikeQuery,
                int.class,
                existsCourseLikeParams);
    }

}
