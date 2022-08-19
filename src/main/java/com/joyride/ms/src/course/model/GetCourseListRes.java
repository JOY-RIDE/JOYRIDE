package com.joyride.ms.src.course.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetCourseListRes {

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

    //==생성 메서드==//
    public static GetCourseListRes  createGetCourseListRes(int id, String crsKorNm, String image, String crsContents, String crsSummary, String crsTourInfo,
                                                           String travelerinfo, double crsDstnc, int crsLevel, String sigun,
                                                           double required_at, String created_at, String updated_at) {
        GetCourseListRes getCourseListRes = new GetCourseListRes();
        getCourseListRes.setId(id);
        getCourseListRes.setCrsKorNm(crsKorNm);
        getCourseListRes.setImage(image);
        //courseInfo.setTotal_rate(total_rate);
        getCourseListRes.setCrsContents(crsContents);
        getCourseListRes.setCrsSummary(crsSummary);
        getCourseListRes.setCrsTourInfo(crsTourInfo);
        getCourseListRes.setTravelerinfo(travelerinfo);
//        getCourseListRes.setTotal_rate(total_rate);
        getCourseListRes.setCrsDstnc(crsDstnc);
//        getCourseListRes.setCrsTotlRqrmHour(crsTotlRqrmHour);
        getCourseListRes.setCrsLevel(crsLevel);
        getCourseListRes.setSigun(sigun);
        getCourseListRes.setRequired_at(required_at);
        getCourseListRes.setCreated_at(created_at);
        getCourseListRes.setUpdated_at(updated_at);


        return getCourseListRes;
    }
}
