package com.joyride.ms.src.course.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetCourseReviewRes {
    private int id;
    //유저 닉네임 뿐만 아니라 유저 사진도?
    private String nickName;
    private int user_id;
    private String title;

    private double total_rate;
    private double scene_rate;
    private double facilities_rate;
    private double safety_rate;
    private double accessibility_rate;

    private String  total_review;
    private String  scene_review;
    private String  facilities_review;
    private String  safety_review;
    private String  accessibility_review;

    private String created_at;
    private String updated_at;


}
