package com.joyride.ms.src.meet.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.joyride.ms.src.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"id", "userId", "courseId","title","local","bicycleType","skill","courseDifficulty","meetingImgUrl","gender",
        "minPeople","maxPeople","joinPeople","path","participationFee","content","meetingDate","dueDate","createdDate"})
public class MeetDetailRes {

    private Integer id;
    private Integer userId;
    private Integer courseId;
    private String title;
    private String local;
    private List<String> bicycleType;
    private int skill;
    private int courseDifficulty;
    private String meetingImgUrl;
    private String gender;
    private int minPeople;
    private int maxPeople;
    private List<User> joinPeople;
    private String path;
    private int participationFee;
    private String content;
    private String meetingDate;
    private String dueDate;
    private String createdAt;
}
