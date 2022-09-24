package com.ssafy.api.request;

import com.ssafy.db.entity.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    private String email;
    private String nickname;
    private String picURL;
    private String description;

    @Builder.Default
    private List<String> interests = new ArrayList<>();

    public static UserUpdateRequest of(User user){
        return UserUpdateRequest.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .picURL(user.getPicURL())
                .description(user.getDescription())
                .build();
    }
}
