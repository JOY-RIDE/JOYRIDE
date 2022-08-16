package com.joyride.ms.src.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostSignupReq {
    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    @Size(max=10, message = "닉네임은 10자 이하여야 합니다.")
    private String nickname;
    @NotBlank(message = "이메일은 필수 입력값입니다.")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
    private String email;
    @NotBlank(message="패스워드는 필수 입력값입니다.")
    private String password;
    @Size(min=1, max=1,message="gender: m/f")
    private String gender; // m/f
    private Integer old;
    private String bicycleType;
    private Integer bicycleCareer;
    @JsonProperty("isTermsEnable")
    private boolean isTermsEnable;
}
