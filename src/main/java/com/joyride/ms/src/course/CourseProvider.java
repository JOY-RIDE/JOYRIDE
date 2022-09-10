package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.*;
import com.joyride.ms.util.BaseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Slf4j
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

            // 좋아요 수 넣어주기와 코스 평점 넣어주기
            for (int i = 0; i < courseList.size(); i++) {
                String courseTitle = courseList.get(i).getCrsKorNm();
                int likeCount = retrieveCourseLikeCount(courseTitle);
                courseList.get(i).setLikeCount(likeCount);

                List<GetCourseReviewRes> getCourseReviewRes = courseDao.selectCourseReviewByCourseId(courseTitle);

                double totalSum = 0;
                for (int j = 0; j < getCourseReviewRes.size(); j ++) {
                    totalSum = totalSum + getCourseReviewRes.get(j).getTotal_rate();
                }
                double totalResult = totalSum/getCourseReviewRes.size();
                totalResult = (Math.round(totalResult*10)/10.0);

                courseList.get(i).setTotalRate(totalResult);
            }


            return courseList;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    public List<GetCourseNameListRes> retrieveCourseTitleList() throws BaseException {
        try {
            List<GetCourseNameListRes> titleList = courseDao.selectCourseTitle();
            Collections.sort(titleList);
            return titleList;
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
    public GetCourseRes retrieveCourse(String title) throws BaseException {
        try{
            JSONArray courseArr = callApi.callCourseAPI(title);
            GetCourseRes course = GetCourseRes.createCourse(courseArr);

            // 코스 리뷰
            List<GetCourseReviewRes> getCourseReviewRes = courseDao.selectCourseReviewByCourseId(title);
            course.setGetCourseReviewRes(getCourseReviewRes);
            double totalSum = 0;
            double accessibilitySum = 0;
            double facilitiesSum = 0;
            double safetySum = 0;
            double sceneSum = 0;
            for (int i = 0; i < getCourseReviewRes.size(); i ++) {
                totalSum = totalSum + getCourseReviewRes.get(i).getTotal_rate();
                accessibilitySum = accessibilitySum + getCourseReviewRes.get(i).getAccessibility_rate();
                facilitiesSum = facilitiesSum + getCourseReviewRes.get(i).getFacilities_rate();
                safetySum = safetySum + getCourseReviewRes.get(i).getSafety_rate();
                sceneSum = sceneSum + getCourseReviewRes.get(i).getScene_rate();
            }
            double totalResult = totalSum/getCourseReviewRes.size();
            totalResult = (Math.round(totalResult*10)/10.0);
            double accessibilityResult = accessibilitySum/getCourseReviewRes.size();
            accessibilityResult = (Math.round(accessibilityResult*10)/10.0);
            double facilitiesResult = facilitiesSum/getCourseReviewRes.size();
            facilitiesResult = (Math.round(facilitiesResult*10)/10.0);
            double safetyResult = safetySum/getCourseReviewRes.size();
            safetyResult = (Math.round(safetyResult*10)/10.0);
            double sceneResult = sceneSum/getCourseReviewRes.size();
            sceneResult = (Math.round(sceneResult*10)/10.0);

            course.setTotalAvg(totalResult);
            course.setAccessibilityAvg(accessibilityResult);
            course.setFacilitiesAvg(facilitiesResult);
            course.setSafetyAvg(safetyResult);
            course.setSceneAvg(sceneResult);


            // 사진과 위 경도.
            GetCourseRes courseTableInfo = courseDao.selectCourseByCourseId(title);
            course.setImage(courseTableInfo.getImage());
            course.setLatitude(courseTableInfo.getLatitude());
            course.setLongitude(courseTableInfo.getLongitude());

            int likeCount = retrieveCourseLikeCount(title);
            course.setLikeCount(likeCount);

            return course;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    // 코스 좋아요 수 조회
    public int retrieveCourseLikeCount(String title) throws BaseException {
        try{
            int likeCount = courseDao.countCourseLike(title);
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

    // 좋아요 조회
    // 좋아요 있으면 1
    // 없으면 0
    public GetCourseLikeRes retrieveCourseLike(GetCourseLikeReq getCourseLikeReq) throws BaseException {
        try{
            String title = getCourseLikeReq.getTitle();
            int id = getCourseLikeReq.getUser_id();
            List<String> selectedTitle = courseDao.selectCourseByUserId(id);
            System.out.println("selectedTitle = " + selectedTitle);
            if (selectedTitle.contains(title)) {
                return  new GetCourseLikeRes(1);
            }

            return  new GetCourseLikeRes(0);
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }



}
