package com.joyride.ms.src.auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.joyride.ms.src.auth.model.Token;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"isNewUser", "user", "accessToken"})
@JsonIgnoreProperties({"newUser", "deleted"}) // newUser/isNewUser 중복 방지
public class GetOauth2SuccessRes {
    @JsonProperty("isNewUser")
    private boolean isNewUser;
    private GetOauth2UserRes user;
    private String accessToken;

    public GetOauth2SuccessRes(boolean isNewUser, GetOauth2UserRes user) {
        this.isNewUser = isNewUser;
        this.user = user;
    }

    public GetOauth2SuccessRes(boolean isNewUser, String accessToken) {
        this.isNewUser = isNewUser;
        this.accessToken = accessToken;
    }
}
