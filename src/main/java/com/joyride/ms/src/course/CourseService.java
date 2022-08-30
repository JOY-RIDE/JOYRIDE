package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.*;
import com.joyride.ms.util.BaseException;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {

    @Value("${durunubi.secret}")
    private String API_SECRET_KEY;
    private final CourseDao courseDao;
    private final CourseProvider courseProvider;

    public List<GetCourseListRes> callCourseList() throws BaseException {
        try {

            String result = "";

            URL url = new URL("https://api.visitkorea.or.kr/openapi/service/rest/Durunubi/" +
                    "courseList?MobileOS=ETC&MobileApp=joyride&ServiceKey=" + API_SECRET_KEY +
                    "&brdDiv=DNBW&numOfRows=3004&pageNo=1&_type=json");

            BufferedReader bf;
            bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            result = bf.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
            JSONObject response = (JSONObject) jsonObject.get("response");
            JSONObject body = (JSONObject) response.get("body");
            JSONObject items = (JSONObject) body.get("items");

            JSONArray courseArr = (JSONArray) items.get("item");

            // 중복 확인용 리스트
            ArrayList<String> courseIdList = new ArrayList<>();
            // 반환할 리스트 객체 생성
            ArrayList<GetCourseListRes> getCourseList = new ArrayList<>();

            for (int i = 0; i < courseArr.size(); i++) {
                JSONObject course = (JSONObject)courseArr.get(i);
                //중복 제거 및, 자전거 길만
                if (courseIdList.contains((String)course.get("crsIdx"))) {
                    continue;
                } else {
                    courseIdList.add((String)course.get("crsIdx"));
                }

                String checkBrdDiv = (String)course.get("brdDiv");
                if (checkBrdDiv.equals("DNWW")) {
                    continue;
                }
                String crsIdx = (String)course.get("crsIdx");
                String crsKorNm = (String)course.get("crsKorNm");
                String crsContents = (String)course.get("crsContents");
                String crsSummary = (String)course.get("crsSummary");
                String crsTourInfo = (String)course.get("crsTourInfo");
                String travelerinfo = (String)course.get("travelerinfo");
                String crsDstncStr = (String)course.get("crsDstnc");
                double crsDstnc = Double.parseDouble(crsDstncStr);
                String crsLevelStr = (String)course.get("crsLevel");
                int crsLevel = Integer.parseInt(crsLevelStr);
                String sigun = (String)course.get("sigun");
                String crsTotlRqrmHourStr = (String)course.get("crsTotlRqrmHour");
                double crsTotlRqrmHour = Double.parseDouble(crsTotlRqrmHourStr);

                // 일단 이미지는 없다고 생각하고.
                GetCourseListRes getCourseListRes = GetCourseListRes.createGetCourseListRes(crsIdx, crsKorNm, crsContents, crsSummary,
                        crsTourInfo, travelerinfo, crsDstnc, crsLevel, sigun, crsTotlRqrmHour);

                String courseId = getCourseListRes.getId();
                int likeCount = courseProvider.retrieveCourseLikeCount(courseId);
                getCourseListRes.setLikeCount(likeCount);

                getCourseList.add(getCourseListRes);

            }
            return getCourseList;
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

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
    public PostCourseLikeRes createCourseLike(int user_id, String course_id) throws BaseException {

        // 유저확인 로직 필요
        try{
            int likeId = courseDao.insertCourseLike(user_id, course_id);
            return new PostCourseLikeRes(likeId);
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
            courseDao.deleteByCourseLikeId(courseLike_id);
            String message = "좋아요 삭제에 성공했습니다.";
            return new DeleteCourseLikeRes(message);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

}

