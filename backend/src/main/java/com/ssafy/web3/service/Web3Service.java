package com.ssafy.web3.service;

import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;

public interface Web3Service {

    void endChallenge(ChallengeJobData challengeJobData);
    void endVote(VoteJobData voteJobData);
}
