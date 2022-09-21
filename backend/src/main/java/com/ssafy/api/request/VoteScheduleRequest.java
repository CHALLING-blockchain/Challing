package com.ssafy.api.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoteScheduleRequest {

    private String challengeId;
    private String voteId;
    private String challengerId;
    private Long triggerAt;
}
