package com.joyride.ms.src.meet.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"id", "userId", "courseName","title","localLocation","ridingSkill","pathDifficulty","meetingImgUrl","gender","joinPeople",
        "maxPeople","path","participationFee","content","minBirthYear","maxBirthYear","gatheringPlace", "status","meetingDate","dueDate","createdAt","bicycleTypes"})
public class MeetListRes {

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
    private List<String> path;
    private int participationFee;
    private String content;
    private int minBirthYear;
    private int maxBirthYear;
    private String gatheringPlace;
    private int status;
    private String meetingDate;
    private String dueDate;
    private String createdAt;
    private List<String> bicycleTypes;

}
