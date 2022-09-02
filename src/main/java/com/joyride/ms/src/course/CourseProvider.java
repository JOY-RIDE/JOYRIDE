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
            List<GetCourseListRes> courseList = GetCourseListRes.createCourseList(courseArr, sigun);

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
    public GetCourseRes retrieveCourse(String title, int userId) throws BaseException {
        try{
            JSONArray courseArr = callApi.callCourseAPI(title);
            GetCourseRes course = GetCourseRes.createCourse(courseArr);

            // 좋아요한 userId
            // 그냥 다 title로 통일?
            //List<Integer> userIdList = courseDao.selectUserIdByCourseId(courseId);
            // Dao 문 필요함
            int checkLike = courseDao.selectStatusByUserId(userId);
            if (checkLike == 0) {
                course.setIsLike(0);
            }
            else {
                course.setIsLike(1);
            }
            // 코스 리뷰
            List<GetCourseReviewRes> getCourseReviewRes = courseDao.selectCourseReviewByCourseId(title);
            course.setGetCourseReviewRes(getCourseReviewRes);

            // 사진과 위 경도.
            GetCourseRes courseTableInfo = courseDao.selectCourseByCourseId(title);
            course.setImage(courseTableInfo.getImage());
            course.setLatitude(courseTableInfo.getLatitude());
            course.setLongitude(courseTableInfo.getLongitude());
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

    public List<GetCourseReviewRes> retrieveCourseReviewByCourseTitle(String title) throws BaseException {
        try{
            List<GetCourseReviewRes> getCourseReviewRes = courseDao.selectCourseReviewByCourseId(title);
            return getCourseReviewRes;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }



}
