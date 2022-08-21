package com.joyride.ms.src.s3.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostProfileImgRes {
    private Integer userId;
    private String profile_img_url;
}

