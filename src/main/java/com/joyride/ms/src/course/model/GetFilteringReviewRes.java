package com.joyride.ms.src.course.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetFilteringReviewRes {

    private int id;
    private String nickName;
    private int user_id;
    private String course_id;

    private String created_at;
    private String updated_at;
}
