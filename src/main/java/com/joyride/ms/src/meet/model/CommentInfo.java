package com.joyride.ms.src.meet.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentInfo {
    private Integer id;
    private Integer userId;
    private String nickname;
    private String profileImgUrl;
    private String content;
    private String createdAt;
}
