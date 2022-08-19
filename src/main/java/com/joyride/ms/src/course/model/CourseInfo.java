package com.joyride.ms.src.course.model;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CourseInfo {

    private int id;

    //title
    private String crsKorNm;

    //course_img_url
    private String image;

    private String crsContents;

    private String crsSummary;

    //tour_point 둘 중 뭔지

    private String crsTourInfo;


    private String travelerinfo;

    //total_rate
//    private double total_rate;

    //거리 distance
    private double crsDstnc;

    //difficulty
    private int crsLevel;
    //시군
    private String sigun;

    //소요시간
    private double required_at;

    //private LocalDateTime created_at;

    //private LocalDateTime updated_at;

    //자전거 길/걷기 길
    private String brdDiv;

    //==생성 메서드==//
    public static CourseInfo createCourseInfo(String crsKorNm, String crsContents, String crsSummary, String crsTourInfo, String travelerinfo,
                                              double crsDstnc, int crsLevel, String sigun, double required_at, String brdDiv) {
        CourseInfo courseInfo = new CourseInfo();
//        courseInfo.setId(id);
        courseInfo.setCrsKorNm(crsKorNm);
        //courseInfo.setImage(image);
        //courseInfo.setTotal_rate(total_rate);
        courseInfo.setCrsContents(crsContents);
        courseInfo.setCrsSummary(crsSummary);
        courseInfo.setCrsTourInfo(crsTourInfo);
        courseInfo.setTravelerinfo(travelerinfo);
        //courseInfo.setTotal_rate(total_rate);
        courseInfo.setCrsDstnc(crsDstnc);
//        courseInfo.setCrsTotlRqrmHour(crsTotlRqrmHour);
        courseInfo.setCrsLevel(crsLevel);
        courseInfo.setSigun(sigun);
        courseInfo.setRequired_at(required_at);
//        courseInfo.setCreated_at(LocalDateTime.now());
//        courseInfo.setUpdated_at(LocalDateTime.now());
        courseInfo.setBrdDiv(brdDiv);


        return courseInfo;
    }
}

