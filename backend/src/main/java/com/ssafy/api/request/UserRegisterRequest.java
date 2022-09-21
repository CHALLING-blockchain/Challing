package com.ssafy.api.request;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterRequest {
    private String email;
    private String nickname;
    private String picurl;
    @Builder.Default
    private List<String> interests = new ArrayList<>();
}
