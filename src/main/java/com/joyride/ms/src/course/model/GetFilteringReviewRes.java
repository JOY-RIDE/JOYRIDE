package com.joyride.ms.src.course.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetFilteringReviewRes {

    private int id;
    private String nickName;
    private int user_id;
    private String title;
    private double filterRate;
    private String filterReview;

    private String created_at;
    private String updated_at;
}
