package com.ssafy.api.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhotoRequest {
    private Long userId;
    private String photoUrl;
}
