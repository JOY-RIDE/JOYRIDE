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
            List<GetCourseListRes> getCourseListRes = courseService.createCourseList();
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

    // 리뷰 조회 api
    @GetMapping("/review/{course_id}")
    public BaseResponse<List<GetCourseReviewRes>> PostCourseReview(@PathVariable("course_id") int course_id){
        try{
            List<GetCourseReviewRes> getCourseReviewRes = courseProvider.retrieveCourseReviewByCourseId(course_id);
            return new BaseResponse<>(getCourseReviewRes);
        } catch(BaseException exception){
            exception.printStackTrace();
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    // 리뷰 삭제 api
    @PatchMapping("/review/{id}/staus")
    public BaseResponse<PatchCourseReviewRes> PatchCourseReviewStatus(@PathVariable("id") int courseReview_id){
        try{
            // 유저 확인 로직 필요
            PatchCourseReviewRes patchCourseReviewRes = courseService.removeCourseReview(courseReview_id);
            return new BaseResponse<>(patchCourseReviewRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }





}
