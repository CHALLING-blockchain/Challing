package com.ssafy.api.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VoteScheduleRequest {

    @NotNull
    private Long voteId;
    @NotNull
    private Long challengeId;
    @NotNull
    private Long userId;
    @NotNull
    private Long challengerId;
    @NotNull
    private Long userIdIndex;
    @NotNull
    private Long challengeIdIndex;
    @NotNull
    private Long triggerAt;
}
