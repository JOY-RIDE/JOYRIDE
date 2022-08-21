package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.GetCourseListRes;
import com.joyride.ms.src.course.model.PostCourseReviewReq;
import com.joyride.ms.src.course.model.PostCourseReviewRes;
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
    @ResponseBody
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
    @ResponseBody
    @PostMapping("/review")
    public BaseResponse<PostCourseReviewRes> PostCourseReview(@RequestBody PostCourseReviewReq postCourseReviewReq){

        try{
            PostCourseReviewRes postCourseReviewRes = courseService.createCourseReview(postCourseReviewReq);
            return new BaseResponse<>(postCourseReviewRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }



}