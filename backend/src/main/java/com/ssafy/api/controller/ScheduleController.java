package com.ssafy.api.controller;

import com.ssafy.api.request.ChallengeScheduleRequest;
import com.ssafy.api.request.VoteScheduleRequest;
import com.ssafy.api.response.BaseResponse;
import com.ssafy.api.service.ScheduleService;
import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
@Slf4j
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/challenge")
    public ResponseEntity<?> addChallengeSchedule(@RequestBody ChallengeScheduleRequest challengeScheduleRequest) {

        try {
            scheduleService.saveAndScheduleChallengeJob(ChallengeJobData.of(challengeScheduleRequest));
        } catch (Exception e) {
            log.error("챌린지 종료 스케줄 추가 실패", e);
            return BaseResponse.fail("챌린지 종료 스케줄 추가 실패");
        }

        return BaseResponse.success();
    }

    @PostMapping("/vote")
    public ResponseEntity<?> addVoteSchedule(@RequestBody VoteScheduleRequest voteScheduleRequest) {

        try {
            scheduleService.saveAndScheduleVoteJob(VoteJobData.of(voteScheduleRequest));
        } catch (Exception e) {
            log.error("투표 종료 스케줄 추가 실패", e);
            return BaseResponse.fail("투표 종료 스케줄 추가 실패");
        }

        return BaseResponse.success();
    }

    @GetMapping("/test")
    public String addScheduleTest() {
        try {
            scheduleService.scheduleChallengeJob(ChallengeJobData.builder()
                    .challengeId("테스트")
                    .triggerAt(Instant.now().plusSeconds(10).getEpochSecond())
                    .build());
        } catch (Exception e) {
            return "FAIL";
        }
        return "SUCCESS";
    }
}
