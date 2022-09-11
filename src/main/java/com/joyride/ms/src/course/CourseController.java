package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.*;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseProvider courseProvider;
    private final CourseService courseService;

    /**
     * 코스 api
     */
    @GetMapping("")
    public BaseResponse<List<GetCourseListRes>> getCourseList(){
        try{
            List<GetCourseListRes> getCourseListRes = courseProvider.retrieveCourseList();
            
            return new BaseResponse<>(getCourseListRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    // 코스 디테일 조회 api
    @GetMapping("/{title}")
    public BaseResponse<GetCourseRes> getCourse(@PathVariable("title") String title){
        try{
            GetCourseRes getCourseRes = courseProvider.retrieveCourse(title);
            return new BaseResponse<>(getCourseRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    // 코스 이름 조회 api
    @GetMapping("/name")
    public BaseResponse<List<GetCourseNameListRes>> getCourseTitleList(){
        try{
            List<GetCourseNameListRes> titleList = courseProvider.retrieveCourseTitleList();
            return new BaseResponse<>(titleList);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    // 코스 필터링 api
    @PostMapping("/filter")
    public BaseResponse<List<GetCourseListRes>> GetFilteringCourse(@RequestBody GetFilteringCourseReq getFilteringCourseReq){
        try{
            List<GetCourseListRes> getCourseListRes = courseProvider.retrieveCourseList(getFilteringCourseReq);
            return new BaseResponse<>(getCourseListRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    // 리뷰작성 api
    @PostMapping("/review")
    public BaseResponse<PostCourseReviewRes> PostCourseReview(@RequestBody PostCourseReviewReq postCourseReviewReq){

        try{
            PostCourseReviewRes postCourseReviewRes = courseService.createCourseReview(postCourseReviewReq);
            return new BaseResponse<>(postCourseReviewRes);
        } catch(BaseException exception){
            exception.printStackTrace();
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    // 리뷰 전체 조회 api
    @GetMapping("/review/{title}")
    public BaseResponse<List<GetCourseReviewRes>> GetCourseReview(@PathVariable("title") String title){
        try{
            List<GetCourseReviewRes> getCourseReviewRes = courseProvider.retrieveCourseReviewByCourseTitle(title);
            return new BaseResponse<>(getCourseReviewRes);
        } catch(BaseException exception){
            exception.printStackTrace();
            return new BaseResponse<>((exception.getStatus()));
        }
    }


    // 리뷰 필터링 조회 api
    @GetMapping("/review/{title}/{filter}")
    public BaseResponse<List<GetFilteringReviewRes>> GetFilteringReview(@PathVariable("title") String title, @PathVariable("filter") String filter){
        try{
            List<GetCourseReviewRes> courseReviewList = courseProvider.retrieveCourseReviewByCourseTitle(title);
            List<GetFilteringReviewRes> getFilteringReviewList = courseService.reviewFilter(courseReviewList, filter);
            return new BaseResponse<>(getFilteringReviewList);
        } catch(BaseException exception){
            exception.printStackTrace();
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    // 리뷰 삭제 api
    @DeleteMapping("/review/{id}")
    public BaseResponse<DeleteCourseReviewRes> PatchCourseReview(@PathVariable("id") int courseReview_id){
        try{
            // 유저 확인 로직 필요
            DeleteCourseReviewRes deleteCourseReviewRes = courseService.removeCourseReview(courseReview_id);
            return new BaseResponse<>(deleteCourseReviewRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    /**
     * 좋아요 api
     */
    // 리뷰 종아요 api
    @PostMapping("/like")
    public BaseResponse<PostCourseLikeRes> PostCourseLike(@RequestBody PostCourseLikeReq postCourseLikeReq) {
        try{
            // 유저 확인 로직 필요
            PostCourseLikeRes postCourseLikeRes = courseService.createCourseLike(postCourseLikeReq);
            return new BaseResponse<>(postCourseLikeRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @PostMapping("/like/check")
    public BaseResponse<GetCourseLikeRes> GetCourseLike(@RequestBody GetCourseLikeReq getCourseLikeReq) {
        try{
            GetCourseLikeRes getCourseLikeRes = courseProvider.retrieveCourseLike(getCourseLikeReq);
            return new BaseResponse<>(getCourseLikeRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }


    //코스 종아요 취소 api
    @DeleteMapping("/like/{courseLike_id}")
    public BaseResponse<DeleteCourseLikeRes> PatchCourseReviewStatus(@PathVariable("courseLike_id") int courseLike_id){
        try{
            // 유저 확인 로직 필요
            DeleteCourseLikeRes deleteCourseReviewRes = courseService.removeCourseLike(courseLike_id);
            return new BaseResponse<>(deleteCourseReviewRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
