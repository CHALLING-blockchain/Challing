package com.ssafy.api.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoteScheduleRequest {

    private String voteId;
    private Long triggerAt;
}
