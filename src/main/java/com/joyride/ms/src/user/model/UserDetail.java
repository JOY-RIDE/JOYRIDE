package com.joyride.ms.src.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetail {

    private Integer id;
    private String nickname;
    private Double manner;
    private String profile_img_url;

}
