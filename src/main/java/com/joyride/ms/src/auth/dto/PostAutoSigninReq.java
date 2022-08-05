package com.joyride.ms.src.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostAutoSigninReq {
    private String email;
    private String password;
}
