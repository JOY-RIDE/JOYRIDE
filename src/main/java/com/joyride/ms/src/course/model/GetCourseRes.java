package com.joyride.ms.src.course.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetCourseRes {

    //응답 값
    private int id;

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

    // 좋아요 표시용
    private int userId;

    // 리뷰

    private List<GetCourseReviewRes> getCourseReviewRes;

    //==생성 메서드==//
    //GetCourseListRes 생성 메서드 이용
    public static GetCourseRes createGetCourseRes(int id, String crsKorNm, String image, String crsContents, String crsSummary, String crsTourInfo,
                                                           String travelerinfo, double crsDstnc, int crsLevel, String sigun,
                                                           double required_at, String created_at, String updated_at) {
        GetCourseRes getCourseRes = new GetCourseRes();
        getCourseRes.setId(id);
        getCourseRes.setCrsKorNm(crsKorNm);
        getCourseRes.setImage(image);
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
        getCourseRes.setCreated_at(created_at);
        getCourseRes.setUpdated_at(updated_at);


        return getCourseRes;
    }

}
