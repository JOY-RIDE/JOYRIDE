package com.joyride.ms.src.auth.dto;

import lombok.Data;

@Data
public class PostSigninReq {
    private String email;
    private String password;
}
