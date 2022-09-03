package com.joyride.ms.src.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserRes {
    private String profileImgUrl;
    private String nickname;
    private String gender;
    private Double manner;
    private Integer birthYear;
    private String introduce;
    private String bicycleType;
    private Integer bicycleCareer;
}

