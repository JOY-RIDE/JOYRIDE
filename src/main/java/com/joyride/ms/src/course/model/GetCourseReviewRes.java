package com.joyride.ms.src.course.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class GetCourseReviewRes {
    private int user_id;
    private String nickName;
    private int course_id;

    private double scene_rate;
    private double facilities_rate;
    private double safety_rate;
    private double accessibility_rate;

    private String  total_review;
    private String  scene_review;
    private String  facilities_review;
    private String  safety_review;
    private String  accessibility_review;
}
