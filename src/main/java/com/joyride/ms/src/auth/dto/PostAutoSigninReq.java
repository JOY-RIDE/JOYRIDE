package com.joyride.ms.src.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostAutoSigninReq {
    private String email;
    private String password;
}
