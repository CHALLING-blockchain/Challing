package com.ssafy.web3.service;

import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
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

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    private static class ResponseBody {
        private String result;
    }

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

        String challengeId = challengeJobData.getChallengeId();

        log.info("Request to backeth: /api/{}/{}", basePath, challengeId);

        ResponseBody responseBody = webClient.get()
                .uri("/" + basePath + "/" + challengeId)
                .retrieve()
                .bodyToMono(ResponseBody.class)
                .blockOptional()
                .orElse(ResponseBody.builder().build());

        log.info("Response from backeth: {}", responseBody);
    }

    @Override
    public void endVote(VoteJobData voteJobData) {
        log.info("** Fire endVote job **");

        String voteId = voteJobData.getVoteId();

        log.info("Request to backeth: /api/endvote/{}", voteId);

        ResponseBody responseBody = webClient.get()
                .uri("/endvote/" + voteId)
                .retrieve()
                .bodyToMono(ResponseBody.class)
                .blockOptional()
                .orElse(ResponseBody.builder().build());

        log.info("Response from backeth: {}", responseBody);
    }
}
