package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.*;
import com.joyride.ms.util.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // 리뷰 필터
    @Transactional(readOnly = true)
    public List<GetFilteringReviewRes> reviewFilter(List<GetCourseReviewRes> courseReviewList, String filter) throws BaseException {
        try{
            ArrayList<GetFilteringReviewRes> getFilteringReviewList = new ArrayList<>();
            for (int i = 0; i < courseReviewList.size(); i++) {
                GetFilteringReviewRes getFilteringReviewRes = new GetFilteringReviewRes();
                getFilteringReviewRes.setTitle(courseReviewList.get(i).getTitle());
                getFilteringReviewRes.setId(courseReviewList.get(i).getId());
                getFilteringReviewRes.setNickName(courseReviewList.get(i).getNickName());
                getFilteringReviewRes.setUser_id(courseReviewList.get(i).getUser_id());
                getFilteringReviewRes.setCreated_at(courseReviewList.get(i).getCreated_at());
                getFilteringReviewRes.setUpdated_at(courseReviewList.get(i).getUpdated_at());

                if (filter.equals("안전")) {
                    getFilteringReviewRes.setFilterReview(courseReviewList.get(i).getSafety_review());
                    getFilteringReviewRes.setFilterRate(courseReviewList.get(i).getSafety_rate());
                    getFilteringReviewList.add(getFilteringReviewRes);

                }
                else if (filter.equals("접근성")) {
                    getFilteringReviewRes.setFilterReview(courseReviewList.get(i).getAccessibility_review());
                    getFilteringReviewRes.setFilterRate(courseReviewList.get(i).getAccessibility_rate());
                    getFilteringReviewList.add(getFilteringReviewRes);
                }
                else if (filter.equals("편의시설")) {
                    getFilteringReviewRes.setFilterReview(courseReviewList.get(i).getFacilities_review());
                    getFilteringReviewRes.setFilterRate(courseReviewList.get(i).getFacilities_rate());
                    getFilteringReviewList.add(getFilteringReviewRes);
                }

                else {
                    getFilteringReviewRes.setFilterReview(courseReviewList.get(i).getScene_review());
                    getFilteringReviewRes.setFilterRate(courseReviewList.get(i).getScene_rate());
                    getFilteringReviewList.add(getFilteringReviewRes);
                }
            }
            return getFilteringReviewList;
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
    public PostCourseLikeRes createCourseLike(PostCourseLikeReq postCourseLikeReq) throws BaseException {

        // 유저확인 로직 필요
        try{

            // 두개를 동시에 어떻게 할꼬...
            // 데이터 베이스 status값 설정해주기
            int user_id = postCourseLikeReq.getUser_id();
            String title = postCourseLikeReq.getTitle();

            List<String> selectedTitle = courseDao.selectCourseByUserId(user_id);
            // 있으면
            if (selectedTitle.contains(title)) {
                courseDao.selectCourseByUserId(user_id);
                String message = "좋아요가 이미 존재합니다.";
                return new PostCourseLikeRes(message);
            }

            courseDao.insertCourseLike(user_id, title);
            String message = "좋아요 등록 성공했습니다.";
            return new PostCourseLikeRes(message);
//            else {
//                // 이거를 동시에 두개 하기가 쉽지 않네
//                // 삭제 api 랑 분리해서 만들자.
//                int status = courseDao.selectCourseLikeStatus(user_id);
//                if (status == 1) {
//                    courseDao.updateCourseLikeToZero(user_id);
//                    String message = "좋아요 삭제에 성공했습니다.";
//                    return new PostCourseLikeRes(message);
//                }
//                else {
//                    courseDao.updateCourseLikeToOne(user_id);
//                    String message = "좋아요 등록 성공했습니다.";
//                    return new PostCourseLikeRes(message);
//                }
//            }

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
            courseDao.deleteCourseLike(courseLike_id);
            String message = "좋아요 삭제에 성공했습니다.";
            return new DeleteCourseLikeRes(message);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

}

