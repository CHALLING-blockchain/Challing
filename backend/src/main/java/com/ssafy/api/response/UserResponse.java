package com.ssafy.api.response;

import com.ssafy.db.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;

    private String email;
    private String nickname;
    private String picURL;
    private String desc;

    public static UserResponse of(User user){
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .picURL(user.getPicURL())
                .desc(user.getDescription())
                .build();
    }
}
