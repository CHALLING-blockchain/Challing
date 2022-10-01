package com.ssafy.web3.service;

import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import com.ssafy.web3.request.EndVoteRequest;
import com.ssafy.web3.response.BackEthResponse;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

/*
 * TODO: FAIL 응답이 왔을 때 잠시 후 재시도하는 로직 추가
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class Web3ServiceImpl implements Web3Service {

    private final WebClient webClient;

    @Override
    public void endChallenge(ChallengeJobData challengeJobData) {
        log.info("** Fire endChallenge job **");

        String basePath;
        switch (challengeJobData.getChallengeType()) {
            case DAILY:
                basePath = "enddailychallenge";
                break;
            case DONATION:
                basePath = "enddonationchallenge";
                break;
            default:
                log.info("NOTHING TO DO: no challenge type");
                return;
        }

        Long challengeId = challengeJobData.getChallengeId();

        log.info("Request to backeth: /api/{}/{}", basePath, challengeId);

        BackEthResponse backEthResponse = webClient.get()
                .uri("/" + basePath + "/" + challengeId)
                .retrieve()
                .bodyToMono(BackEthResponse.class)
                .blockOptional()
                .orElse(BackEthResponse.builder().build());

        log.info("Response from backeth: {}", backEthResponse);
    }

    @Override
    public void endVote(VoteJobData voteJobData) {
        log.info("** Fire endVote job **");

        EndVoteRequest endVoteRequest = voteJobData.toEndVoteRequest();

        log.info("Request to backeth: /api/endvote body: {}", endVoteRequest);

        BackEthResponse backEthResponse = webClient.post()
                .uri("/endvote")
                .bodyValue(endVoteRequest)
                .retrieve()
                .bodyToMono(BackEthResponse.class)
                .blockOptional()
                .orElse(BackEthResponse.builder().build());

        log.info("Response from backeth: {}", backEthResponse);
    }
}
