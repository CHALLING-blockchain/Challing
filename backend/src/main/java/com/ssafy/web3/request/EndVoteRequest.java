package com.ssafy.web3.request;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EndVoteRequest {
    private Long voteId;
    private Long challengeId;
    private Long userId;
    private Long challengerId;
    private Long userIdIndex;
    private Long challengeIdIndex;
    private Long photoId;
}
