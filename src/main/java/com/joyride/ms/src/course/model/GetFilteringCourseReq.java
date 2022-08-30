package com.joyride.ms.src.course.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetFilteringCourseReq {

    private String level;
    private String sigun;
}
