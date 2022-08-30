package com.joyride.ms.src.course.model;

import com.joyride.ms.util.BaseException;
import lombok.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetCourseRes {

    //응답 값
    private String id;

    //title
    private String crsKorNm;

    //course_img_url
    private String image;

    private String crsContents;

    private String crsSummary;

    //tour_point 둘 중 뭐지?
    private String crsTourInfo;

    //    @Lob
    private String travelerinfo;

    //total_rate
    //private double total_rate;

    //거리 distance
    private double crsDstnc;

    //difficulty
    private int crsLevel;

    //시군
    private String sigun;

    //소요시간
    private double required_at;

    //LocalDateTime?
    private String created_at;

    private String updated_at;

    // 이 클래스를 확장해서 디테일에서 보여줄 부분들 추가

    // 좋아요 누른 유저들
    private List<Integer> userIdList;

    // 리뷰

    private List<GetCourseReviewRes> getCourseReviewRes;

    //==생성 메서드==//
    //GetCourseListRes 생성 메서드 이용
    public static GetCourseRes createGetCourseRes(String id, String crsKorNm, String crsContents, String crsSummary, String crsTourInfo,
                                                           String travelerinfo, double crsDstnc, int crsLevel, String sigun,
                                                           double required_at) {
        GetCourseRes getCourseRes = new GetCourseRes();
        getCourseRes.setId(id);
        getCourseRes.setCrsKorNm(crsKorNm);
//        getCourseRes.setImage(image);
        //courseInfo.setTotal_rate(total_rate);
        getCourseRes.setCrsContents(crsContents);
        getCourseRes.setCrsSummary(crsSummary);
        getCourseRes.setCrsTourInfo(crsTourInfo);
        getCourseRes.setTravelerinfo(travelerinfo);
//        getCourseRes.setTotal_rate(total_rate);
        getCourseRes.setCrsDstnc(crsDstnc);
//        getCourseRes.setCrsTotlRqrmHour(crsTotlRqrmHour);
        getCourseRes.setCrsLevel(crsLevel);
        getCourseRes.setSigun(sigun);
        getCourseRes.setRequired_at(required_at);
//        getCourseRes.setCreated_at(created_at);
//        getCourseRes.setUpdated_at(updated_at);


        return getCourseRes;
    }

    // 반환 디테일 코스를 만들어 주는 메소드
    public static GetCourseRes createCourse(JSONArray courseArr) throws BaseException {
        try {
            JSONObject course = (JSONObject)courseArr.get(0);

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
            GetCourseRes getCourseRes = GetCourseRes.createGetCourseRes(crsIdx, crsKorNm, crsContents, crsSummary,
                    crsTourInfo, travelerinfo, crsDstnc, crsLevel, sigun, crsTotlRqrmHour);
            return getCourseRes;
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

}
