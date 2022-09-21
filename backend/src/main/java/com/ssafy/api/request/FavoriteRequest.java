package com.ssafy.api.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequest {
    private String email;
    private Long challengeId;
}
