package com.joyride.ms.src.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostSignupOauth2Req {
    private String email;
    private String provider;
    private String providerId;
    @JsonProperty("isTermsEnable")
    private boolean isTermsEnable;
}
