package com.joyride.ms.src.course.model;

import com.joyride.ms.src.course.CourseDao;
import com.joyride.ms.util.BaseException;
import lombok.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Lob;
import java.util.ArrayList;
import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetCourseListRes {

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

    private String travelerinfo;

    //거리 distance
    private double crsDstnc;

    //difficulty
    private int crsLevel;

    //시군
    private String sigun;

    //소요시간
    private double required_at;

    private int likeCount;

    private double totalRate;

    //==생성 메서드==//
    public static GetCourseListRes createGetCourseListRes(String id, String crsKorNm, String crsContents, String crsSummary, String crsTourInfo,
                                                           String travelerinfo, double crsDstnc, int crsLevel, String sigun,
                                                           double required_at) {
        GetCourseListRes getCourseListRes = new GetCourseListRes();
        getCourseListRes.setId(id);
        getCourseListRes.setCrsKorNm(crsKorNm);
//        getCourseListRes.setImage(image);
        getCourseListRes.setCrsContents(crsContents);
        getCourseListRes.setCrsSummary(crsSummary);
        getCourseListRes.setCrsTourInfo(crsTourInfo);
        getCourseListRes.setTravelerinfo(travelerinfo);
//        getCourseListRes.setTotal_rate(total_rate);
        getCourseListRes.setCrsDstnc(crsDstnc);
        getCourseListRes.setCrsLevel(crsLevel);
        getCourseListRes.setSigun(sigun);
        getCourseListRes.setRequired_at(required_at);

        return getCourseListRes;
    }

    // 반환 리스트를 만들어주는 메소드
    public static List<GetCourseListRes> createCourseList(JSONArray courseArr) throws BaseException {
        try {
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

                getCourseList.add(getCourseListRes);

            }
            return getCourseList;
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    // 반환 리스트를 만들어주는 메소드(필터링)
    public static List<GetCourseListRes> createCourseList(JSONArray courseArr, String place) throws BaseException {
        try {
            if (place == null) {
                place = "";
            }
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

                String checkSigun = (String)course.get("sigun");
                if (!checkSigun.contains(place)) {
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

                getCourseList.add(getCourseListRes);

            }
            return getCourseList;
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
