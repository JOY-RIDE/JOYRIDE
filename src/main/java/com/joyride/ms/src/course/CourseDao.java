package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CourseDao {

    private final JdbcTemplate jdbcTemplate;


    /**
     * 코스
     */
    public int countCourseLike(String title){
        String countCourseLikeQuery = "select count(*) from courselike where course_id = ?";
        String countCourseLikeParams = title;
        return this.jdbcTemplate.queryForObject(countCourseLikeQuery, Integer.class, countCourseLikeParams);
    }

    // 코스 이름 조회
    public List<GetCourseNameListRes> selectCourseTitle(){
        String getCourserTitleQuery = "select title from course";
        return this.jdbcTemplate.query(getCourserTitleQuery,
                (rs,rowNum) -> new GetCourseNameListRes(rs.getString("title")));
    }

    // 코스 이미지 조회
    public List<String>selectCourseImage(){
        String selectCourseImageQuery = "select course_img_url from course";
        return this.jdbcTemplate.query(selectCourseImageQuery,
                (rs,rowNum) -> (rs.getString("course_img_url")));
    }

    // 코스 타이틀 조회
    public List<String> selectCourseTitle(int user_id){
        String selectCourseTitleQuery = "select course_id from courselike where user_id = ?";
        int selectCourseTitle = user_id;
        return this.jdbcTemplate.query(selectCourseTitleQuery,
                (rs,rowNum) -> (rs.getString("course_id")
                ), selectCourseTitle);
    }

    // 코스 이미지, 위도, 경도 가져오기
    public GetCourseRes selectCourseByCourseId(String title){
        String getCourseQuery = "select course_img_url, latitude, longitude from course where title = ?";
        String getCourseParams = title;
        return this.jdbcTemplate.queryForObject(getCourseQuery,
                (rs,rowNum) -> GetCourseRes.createGetCourseRes(
                        rs.getString("course_img_url"),
                        rs.getString("latitude"),
                        rs.getString("longitude")
                ), getCourseParams);
    }

    /**
     * 코스 리뷰
     */

    // 리뷰 생성
    public int insertCourseReview(PostCourseReviewReq postCourseReviewReq, double totalRate){

        String insertCourseReviewQuery = "insert into courseReview (user_id, course_id, total_rate, scene_rate, facilities_rate, " +
                "safety_rate, accessibility_rate, total_review, scene_review, facilities_review, safety_review, accessibility_review) " +
                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

        Object[] insertCourseReviewParams = new Object[]{postCourseReviewReq.getUser_id(), postCourseReviewReq.getTitle(),
                totalRate, postCourseReviewReq.getScene_rate(), postCourseReviewReq.getFacilities_rate(), postCourseReviewReq.getSafety_rate(),
                postCourseReviewReq.getAccessibility_rate(), postCourseReviewReq.getTotal_review(), postCourseReviewReq.getScene_review(),
                postCourseReviewReq.getFacilities_review(), postCourseReviewReq.getSafety_review(), postCourseReviewReq.getAccessibility_review()};

        this.jdbcTemplate.update(insertCourseReviewQuery, insertCourseReviewParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery,int.class);
    }

    // 코스 리뷰 조회
    public List<GetCourseReviewRes> selectCourseReviewByCourseId(String title){
        String selectCourseReviewQuery = "select CR.id, U.nickname, CR.user_id, course_id, total_rate, scene_rate, facilities_rate,safety_rate, accessibility_rate,\n" +
                "       total_review, scene_review, facilities_review, safety_review,accessibility_review,\n" +
                "       CR.created_at, CR.updated_at from coursereview CR\n" +
                "                              INNER join user U\n" +
                "                                    on CR.user_id = U.id\n" +
                "    where course_id=?";
        String selectCourseReviewParams = title;

        return this.jdbcTemplate.query(selectCourseReviewQuery,
                (rs,rowNum) -> new GetCourseReviewRes(
                        rs.getInt("id"),
                        rs.getString("nickname"),
                        rs.getInt("user_id"),
                        rs.getString("course_id"),
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

    // 코스 리뷰 삭제 시 리뷰가 존재하는지 확인
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
    public int insertCourseLike(int user_id, String title){

        String createCourseLikeQuery = "insert into courselike (user_id, course_id) VALUES (?,?)";

        Object[] createCourseLikeParams = new Object[]{user_id, title};
        this.jdbcTemplate.update(createCourseLikeQuery, createCourseLikeParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery,int.class);
    }

    //좋아요 삭제
    public void deleteCourseLike(int courseLike_id){
        // 이 부분 체크
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

    public List<String>selectCourseByUserId(int user_id) {
        String selectCourseByUserIdQuery = "select course_id from courselike where user_id = ?";
        int selectCourseByUserIdParams = user_id;
        return this.jdbcTemplate.query(selectCourseByUserIdQuery,
                (rs,rowNum) -> rs.getString("course_id"),
                selectCourseByUserIdParams);
    }
}
