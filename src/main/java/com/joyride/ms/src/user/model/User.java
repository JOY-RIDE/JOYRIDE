package com.joyride.ms.src.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private Long id;
    private String nickname;
    private String email;
    private String password;
    private String gender;
    private Integer old;

    private String profile_img_url;
    private String introduce;
    private String bicycleType;
    private String role;
    private String provider;
    private String provider_id;


    public User(String nickname, String email, String password, String gender,Integer old, String bicycleType, String role, String provider, String provider_id){
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.old = old;
        this.bicycleType = bicycleType;
        this.role = role;
        this.provider = provider;
        this.provider_id = provider_id;
    }
}
