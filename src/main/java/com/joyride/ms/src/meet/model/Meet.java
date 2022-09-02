package com.joyride.ms.src.meet.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Meet {

    private Integer id;
    private Integer userId;
    private String courseName;
    private String title;
    private String localLocation;
    private int ridingSkill;
    private int pathDifficulty;
    private String meetingImgUrl;
    private String gender;
    private Integer joinPeople;
    private int maxPeople;
    private String path;
    private int participationFee;
    private String content;
    private int minBirthYear;
    private int maxBirthYear;
    private String meetingDate;
    private String dueDate;
    private String createdAt;
    private List<String> bicycleTypes;

}
