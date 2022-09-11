package com.joyride.ms.src.meet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetFilterReq {

    private Integer age;
    private String bicycleTypes;
    private String gender;
    private Integer participationFee;
    private String location;
    private Integer maxNumOfParticipants;
    private Integer minNumOfParticipants;
    private Integer pathDifficulty;
    private Integer ridingSkill;

}
