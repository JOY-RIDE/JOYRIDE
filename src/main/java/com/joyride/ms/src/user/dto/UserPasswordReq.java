package com.joyride.ms.src.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPasswordReq {
    private String oldPassword;
    private String newPassword;
}
