package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.GetCourseListRes;
import com.joyride.ms.src.course.model.GetCourseRes;
import com.joyride.ms.src.course.model.GetCourseReviewRes;
import com.joyride.ms.src.course.model.GetFilteringCourseReq;
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
    private final CallApi callApi;

    // 코스 리스트 조회 api
    public List<GetCourseListRes> retrieveCourseList() throws BaseException {
        try {

            JSONArray courseArr = callApi.callCourseAPI();
            List<GetCourseListRes> courseList = GetCourseListRes.createCourseList(courseArr);

            // 좋아요 수 넣어주기
            for (int i = 0; i < courseList.size(); i++) {
                String courseId = courseList.get(i).getId();
                int likeCount = retrieveCourseLikeCount(courseId);
                courseList.get(i).setLikeCount(likeCount);
            }
            return courseList;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    // 코스 필터링 조회
    public List<GetCourseListRes> retrieveCourseList(GetFilteringCourseReq getFilteringCourseReq) throws BaseException {
        try {
            String sigun = getFilteringCourseReq.getSigun();
            String level = getFilteringCourseReq.getLevel();

            JSONArray courseArr = callApi.callCourseAPI(sigun, level);
            List<GetCourseListRes> courseList = GetCourseListRes.createCourseList(courseArr);

            // 좋아요 수 넣어주기
            for (int i = 0; i < courseList.size(); i++) {
                String courseId = courseList.get(i).getId();
                int likeCount = retrieveCourseLikeCount(courseId);
                courseList.get(i).setLikeCount(likeCount);
            }
            return courseList;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    // 코스 디테일 조회 api
    public GetCourseRes retrieveCourse(String title) throws BaseException {
        try{
            JSONArray courseArr = callApi.callCourseAPI(title);
            GetCourseRes course = GetCourseRes.createCourse(courseArr);

            // 좋아요한 userId
            String courseId = course.getId();
            List<Integer> userIdList = courseDao.selectUserIdByCourseId(courseId);
            course.setUserIdList(userIdList);

            // 코스 리뷰
            List<GetCourseReviewRes> getCourseReviewRes = courseDao.selectCourseReviewByCourseId(courseId);
            course.setGetCourseReviewRes(getCourseReviewRes);

            return course;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

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

    // 리뷰 조회
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
