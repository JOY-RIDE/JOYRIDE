package com.joyride.ms.src.meet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetCreateReq {
    private String title;
    private String courseName;
    private String localLocation;
    private int ridingSkill;
    private int pathDifficulty;
    private String gender;
    private int maxPeople;
    private String path;
    private List<String> bicycleTypes;
    private int participationFee;
    private String content;
    private int minBirthYear;
    private int maxBirthYear;
    private String meetingDate;
    private String dueDate;
}
