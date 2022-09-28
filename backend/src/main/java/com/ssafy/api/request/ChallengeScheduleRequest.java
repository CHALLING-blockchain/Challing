package com.ssafy.api.request;

import com.ssafy.web3.job.ChallengeType;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeScheduleRequest {

    private String challengeId;
    private ChallengeType challengeType;
    private Long triggerAt;
}
