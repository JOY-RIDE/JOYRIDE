package com.joyride.ms.src.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostAccessRes {
    private final String accessToken;
    private Integer userId;
}
