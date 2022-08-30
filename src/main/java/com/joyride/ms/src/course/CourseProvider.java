package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.GetCourseListRes;
import com.joyride.ms.src.course.model.GetCourseRes;
import com.joyride.ms.src.course.model.GetCourseReviewRes;
import com.joyride.ms.util.BaseException;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseProvider {

    private final CourseDao courseDao;
    private final CourseService courseService;

    // 코스 리스트 조회 api
    public List<GetCourseListRes> retrieveCourseList() throws BaseException {
        try {

            JSONArray courseArr = courseService.callCourseAPI();
            List<GetCourseListRes> courseList = courseService.createCourseList(courseArr);
            return courseList;
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
    // 코스 디테일 조회 api
    public GetCourseRes retrieveCourse(String course_id) throws BaseException {
        try{
            JSONArray courseArr = courseService.callCourseAPI(course_id);
            //코스 디테일은 디테일 시에만 쓴느 거니까 따로 만들어야겠다.
            GetCourseRes course = courseService.createCourse(courseArr);

            String courseId = course.getId();
            // 좋아요한 userId
            List<Integer> userIdList = courseDao.selectUserIdByCourseId(courseId);
            course.setUserIdList(userIdList);

            // 코스 리뷰들
            List<GetCourseReviewRes> getCourseReviewRes = courseDao.selectCourseReviewByCourseId(courseId);
            course.setGetCourseReviewRes(getCourseReviewRes);

            return course;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
//    // 코스 디테일 조회 api
//    public GetCourseRes retrieveCourse(String course_id) throws BaseException {
//        try{
//            GetCourseRes getCourseRes = courseDao.selectCourse(course_id);
//
//            // 좋아요한 userId
//            List<Integer> userIdList = courseDao.selectUserIdByCourseId(course_id);
//            getCourseRes.setUserIdList(userIdList);
//
//            // 코스 리뷰들
//            List<GetCourseReviewRes> getCourseReviewRes = courseDao.selectCourseReviewByCourseId(course_id);
//            getCourseRes.setGetCourseReviewRes(getCourseReviewRes);
//
//            return getCourseRes;
//        }
//        catch (Exception exception) {
//            exception.printStackTrace();
//            throw new BaseException(DATABASE_ERROR);
//        }
//    }

//    public List<GetCourseListRes> retrieveCourseList() throws BaseException {
//        try{
//            List<GetCourseListRes> getCourseListRes = courseDao.selectCourseList();
//            for (int i = 0; i < getCourseListRes.size(); i++) {
//                String courseId = getCourseListRes.get(i).getId();
//                int likeCount = courseDao.countCourseLike(courseId);
//                getCourseListRes.get(i).setLikeCount(likeCount);
//            }
//            return getCourseListRes;
//        }
//        catch (Exception exception) {
//            exception.printStackTrace();
//            throw new BaseException(DATABASE_ERROR);
//        }
//    }

    // 코스 좋아요 수 조회
    public int retrieveCourseLikeCount(String courseId) throws BaseException {
        try{
            int likeCount = courseDao.countCourseLike(courseId);
            return likeCount;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    // 리뷰 조회 provider
    public List<GetCourseReviewRes> retrieveCourseReviewByCourseId(String course_id) throws BaseException {
        try{
            List<GetCourseReviewRes> getCourseReviewRes = courseDao.selectCourseReviewByCourseId(course_id);
            return getCourseReviewRes;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }



}
