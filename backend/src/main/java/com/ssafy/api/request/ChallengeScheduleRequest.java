package com.ssafy.api.request;

import com.ssafy.web3.job.ChallengeType;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeScheduleRequest {

    @NotNull
    private Long challengeId;
    @NotNull
    private ChallengeType challengeType;
    @NotNull
    private Long triggerAt;
}
