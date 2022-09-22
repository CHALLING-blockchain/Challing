package com.ssafy.api.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeScheduleRequest {

    private String challengeId;
    private Long triggerAt;
}
