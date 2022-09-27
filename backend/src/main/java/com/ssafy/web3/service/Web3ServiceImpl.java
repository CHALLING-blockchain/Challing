package com.ssafy.web3.service;

import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

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

        String challengeId = challengeJobData.getChallengeId();

        log.info("Request to backeth: /api/endchallenge/{}", challengeId);

        ResponseBody responseBody = webClient.get()
                .uri("/endchallenge/" + challengeId)
                .retrieve()
                .bodyToMono(ResponseBody.class)
                .blockOptional()
                .orElse(ResponseBody.builder().build());

        log.info("Response from backeth: {}", responseBody);
    }

    @Override
    public void endVote(VoteJobData voteJobData) {
        log.info("** Fire endVote job **");

        Map<String, String> map = new HashMap<>();
        map.put("challengeId", voteJobData.getChallengeId());
        map.put("voteId", voteJobData.getVoteId());
        map.put("challengerId", voteJobData.getChallengerId());

        log.info("Request to backeth: /api/endvote body: {}", map);

        ResponseBody responseBody = webClient.post()
                .uri("/endvote")
                .body(Mono.just(map), Map.class)
                .retrieve()
                .bodyToMono(ResponseBody.class)
                .blockOptional()
                .orElse(ResponseBody.builder().build());

        log.info("Response from backeth: {}", responseBody);
    }
}
