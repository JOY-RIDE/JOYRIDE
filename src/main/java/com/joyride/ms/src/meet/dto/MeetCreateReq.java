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
    private String courseId;
    private String local;
    private int skill;
    private int courseDifficulty;
    private String gender;
    private int minPeople;
    private int maxPeople;
    private String path;
    private List<String> bicycleType;
    private int participationFee;
    private String content;
    private String meetingDate;
    private String dueDate;

}
