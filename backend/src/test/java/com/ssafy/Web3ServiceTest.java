package com.ssafy;

import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import com.ssafy.web3.service.Web3Service;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class Web3ServiceTest {

    @Autowired
    Web3Service web3Service;

//    @Test
//    void endChallengeTest() {
//        web3Service.endChallenge(ChallengeJobData.builder()
//                .challengeId("0")
//                .build());
//    }
//
//    @Test
//    void endVoteTest() {
//        web3Service.endVote(VoteJobData.builder()
//                .challengeId("chid")
//                .voteId("vtid")
//                .challengerId("chrid")
//                .build());
//    }
}
