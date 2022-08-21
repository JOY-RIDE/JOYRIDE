package com.joyride.ms.src.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchUserReq {
    @Size(max=10, message = "닉네임은 10자 이하여야 합니다.")
    private String nickname;
    @Size(min=1, max=1,message="gender: m/f")
    private String gender;
    private Integer old;
    private String introduce;
    private String bicycleType;
    private Integer bicycleCareer;
}
