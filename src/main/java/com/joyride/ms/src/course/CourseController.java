package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.GetCourseListRes;
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

    //CourseList 를 출력하는게 아니라 바로 디테일로 누르면 어떻게 해야하지...
    //무조건 여기를 거쳐서 가도록? 아니면 갈리는 부분마다 다 api 호출 확인??
    @ResponseBody
    @GetMapping("")
    public BaseResponse<List<GetCourseListRes>> getCourseList(){
        try{
            List<GetCourseListRes> getCourseListRes = courseService.getCourseList();
            return new BaseResponse<>(getCourseListRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }


}
