package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.GetCourseListRes;
import com.joyride.ms.util.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Service
@RequiredArgsConstructor
public class CourseProvider {

    private final CourseDao courseDao;

    public List<GetCourseListRes> getCourseList() throws BaseException {
        System.out.println("프로바이더 호출됨");
        try{
            List<GetCourseListRes> getCourseListRes = courseDao.getCourseList();
            System.out.println("getCourseListRes = " + getCourseListRes);
            return getCourseListRes;

        }
        catch (Exception exception) {
            //이것도 baseException
//            throw new BaseException(DATABASE_ERROR);
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
