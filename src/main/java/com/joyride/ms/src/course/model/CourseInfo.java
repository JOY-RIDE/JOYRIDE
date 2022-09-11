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
    private String crsTourInfo;
    private String travelerinfo;
    //거리 distance
    private double crsDstnc;
    // difficulty
    private int crsLevel;
    //시군
    private String sigun;
    //소요시간
    private double required_at;
    //자전거 길/걷기 길
    private String brdDiv;

    //==생성 메서드==//
    public static CourseInfo createCourseInfo(String crsKorNm, String crsContents, String crsSummary, String crsTourInfo, String travelerinfo,
                                              double crsDstnc, int crsLevel, String sigun, double required_at, String brdDiv) {
        CourseInfo courseInfo = new CourseInfo();
        courseInfo.setCrsKorNm(crsKorNm);
        courseInfo.setCrsContents(crsContents);
        courseInfo.setCrsSummary(crsSummary);
        courseInfo.setCrsTourInfo(crsTourInfo);
        courseInfo.setTravelerinfo(travelerinfo);
        courseInfo.setCrsDstnc(crsDstnc);
        courseInfo.setCrsLevel(crsLevel);
        courseInfo.setSigun(sigun);
        courseInfo.setRequired_at(required_at);
        courseInfo.setBrdDiv(brdDiv);
        return courseInfo;
    }
}

