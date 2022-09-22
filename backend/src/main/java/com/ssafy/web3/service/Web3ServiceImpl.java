package com.ssafy.web3.service;

import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class Web3ServiceImpl implements Web3Service {
    @Override
    public void endChallenge(ChallengeJobData challengeJobData) {
        log.info("** Fire endChallenge job ** {}", challengeJobData.getChallengeId());
    }

    @Override
    public void endVote(VoteJobData VoteJobData) {
        log.info("** Fire endVote job ** {} {} {}",
                VoteJobData.getChallengeId(), VoteJobData.getVoteId(), VoteJobData.getChallengerId());
    }
}
