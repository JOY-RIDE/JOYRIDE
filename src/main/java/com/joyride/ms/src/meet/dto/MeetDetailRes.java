package com.joyride.ms.src.meet.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.joyride.ms.src.user.model.UserDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"admin","maxPeople","participants"})
public class MeetDetailRes {

    private UserDetail admin;
    private int maxPeople;
    private List<UserDetail> participants;
}
