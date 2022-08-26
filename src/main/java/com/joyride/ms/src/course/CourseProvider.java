package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.GetCourseListRes;
import com.joyride.ms.src.course.model.GetCourseRes;
import com.joyride.ms.src.course.model.GetCourseReviewRes;
import com.joyride.ms.util.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Service
@RequiredArgsConstructor
public class CourseProvider {

    private final CourseDao courseDao;

    public List<GetCourseListRes> retrieveCourseList() throws BaseException {
        try{
            List<GetCourseListRes> getCourseListRes = courseDao.selectCourseList();
            return getCourseListRes;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    // 리뷰 조회 provider
    public List<GetCourseReviewRes> retrieveCourseReviewByCourseId(int course_id) throws BaseException {
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
