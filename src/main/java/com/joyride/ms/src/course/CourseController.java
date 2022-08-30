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

    //일단은 이 URI를 거쳐서만 들어간다고 생각하고 코드 작성
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

    // 리뷰 조회 api
    @GetMapping("/review/{course_id}")
    public BaseResponse<List<GetCourseReviewRes>> PostCourseReview(@PathVariable("course_id") String course_id){
        try{
            List<GetCourseReviewRes> getCourseReviewRes = courseProvider.retrieveCourseReviewByCourseId(course_id);
            return new BaseResponse<>(getCourseReviewRes);
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
    // 요청: 좋아요할 코스의 아이디와 좋아요하는 유저 아이디 필요
    // @PathVariable로 하는게 맞을까? RequestBody로 하는게 맞을까?
    // 응답:
    @PostMapping("/like/{user_id}/{course_id}")
    public BaseResponse<PostCourseLikeRes> PostCourseLike(@PathVariable("user_id") int user_id, @PathVariable("course_id") String course_id){
        try{
            // 유저 확인 로직 필요
            PostCourseLikeRes postCourseLikeRes = courseService.createCourseLike(user_id, course_id);
            return new BaseResponse<>(postCourseLikeRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    //리뷰 종아요 취소 api
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
