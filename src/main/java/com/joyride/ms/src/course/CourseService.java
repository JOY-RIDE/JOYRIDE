package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.*;
import com.joyride.ms.util.BaseException;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {
    private final CourseDao courseDao;
    private final CourseProvider courseProvider;

    // 리뷰작성 service
    public PostCourseReviewRes createCourseReview(PostCourseReviewReq postCourseReviewReq) throws BaseException {

        try{
            double totalRate = calculateTotalRate(postCourseReviewReq);
            int id = courseDao.insertCourseReview(postCourseReviewReq, totalRate);
            String message = "리뷰 작성에 성공했습니다.";
            return new PostCourseReviewRes(id, message);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    //totalRate 계산 메소드
    @Transactional(readOnly = true)
    public Double calculateTotalRate(PostCourseReviewReq postCourseReviewReq) throws BaseException {
        try{
            double sum = postCourseReviewReq.getAccessibility_rate() + postCourseReviewReq.getFacilities_rate() +
                    postCourseReviewReq.getSafety_rate() + postCourseReviewReq.getScene_rate();
            double totalRate = sum / 4;

            return totalRate;
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    //리뷰 삭제 api
    public DeleteCourseReviewRes removeCourseReview(int courseReview_id) throws BaseException {

        // 유저확인 로직 필요
        int existsCourseReview = courseDao.existsCourseReview(courseReview_id);
        if (existsCourseReview == 0) {
            throw new BaseException(COURSE_REVIEW_NOT_EXISTS);
        }
        try{
           courseDao.deleteByCourseReviewId(courseReview_id);
            String message = "리뷰 삭제에 성공했습니다.";
            return new DeleteCourseReviewRes(message);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    /**
     * 코스 좋아요
     */

    //코스 좋아요 생성
    public PostCourseLikeRes createCourseLike(int user_id, String course_id) throws BaseException {

        // 유저확인 로직 필요
        try{
            int likeId = courseDao.insertCourseLike(user_id, course_id);
            return new PostCourseLikeRes(likeId);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    //코스 좋아요 삭제
    public DeleteCourseLikeRes removeCourseLike(int courseLike_id) throws BaseException {

        // 유저확인 로직 필요
        int existsCourseLike = courseDao.existsCourseLike(courseLike_id);
        if (existsCourseLike == 0) {
            throw new BaseException(COURSE_LIKE_NOT_EXISTS);
        }
        try{
            courseDao.deleteByCourseLikeId(courseLike_id);
            String message = "좋아요 삭제에 성공했습니다.";
            return new DeleteCourseLikeRes(message);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

}

