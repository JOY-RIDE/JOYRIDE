package com.joyride.ms.src.auth.dto;

import com.joyride.ms.src.auth.model.Token;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class PostAccessRes {
    private final Token token;
}
