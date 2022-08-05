package com.joyride.ms.src.auth.dto;

import com.joyride.ms.src.auth.model.Token;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostAutoSigninRes {
    private Token token;
}