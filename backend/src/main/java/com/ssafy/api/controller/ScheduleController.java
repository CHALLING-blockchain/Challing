package com.ssafy.api.controller;

import com.ssafy.api.request.ChallengeScheduleRequest;
import com.ssafy.api.request.VoteScheduleRequest;
import com.ssafy.api.response.BaseResponse;
import com.ssafy.api.service.ScheduleService;
import com.ssafy.db.entity.Schedule;
import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import com.ssafy.web3.service.Web3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
@Slf4j
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final Web3Service web3Service;

    @PostMapping("/challenge")
    public ResponseEntity<?> addChallengeSchedule(@RequestBody ChallengeScheduleRequest challengeScheduleRequest) {

        log.info("챌린지 스케줄 요청: {}", challengeScheduleRequest);

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

        log.info("투표 스케줄 요청: {}", voteScheduleRequest);

        try {
            scheduleService.saveAndScheduleVoteJob(VoteJobData.of(voteScheduleRequest));
        } catch (Exception e) {
            log.error("투표 종료 스케줄 추가 실패", e);
            return BaseResponse.fail("투표 종료 스케줄 추가 실패");
        }

        return BaseResponse.success();
    }

    @GetMapping("/endlastdaily")
    public ResponseEntity<?> endLastDailyChallenge() {
        log.info("** 어드민 ** 최근 추가된 일상 챌린지 종료");
        try {
            Schedule schedule = scheduleService
                    .getLastDailyChallengeSchedule()
                    .orElseThrow();

            web3Service.endChallenge(ChallengeJobData.of(schedule));
        } catch (Exception e) {
            log.error("** 어드민 ** 최근 추가된 일상 챌린지 종료 실패", e);
            return BaseResponse.fail("** 어드민 ** 최근 추가된 일상 챌린지 종료 실패");
        }
        return BaseResponse.success();
    }

    @GetMapping("/endlastdonation")
    public ResponseEntity<?> endLastDonationChallenge() {
        log.info("** 어드민 ** 최근 추가된 기부 챌린지 종료");
        try {
            Schedule schedule = scheduleService
                    .getLastDonationChallengeSchedule()
                    .orElseThrow();

            web3Service.endChallenge(ChallengeJobData.of(schedule));
        } catch (Exception e) {
            log.error("** 어드민 ** 최근 추가된 기부 챌린지 종료 실패", e);
            return BaseResponse.fail("** 어드민 ** 최근 추가된 기부 챌린지 종료 실패");
        }
        return BaseResponse.success();
    }

    @GetMapping("/endlastvote")
    public ResponseEntity<?> endLastVote() {
        log.info("** 어드민 ** 최근 추가된 투표 종료");
        try {
            Schedule schedule = scheduleService
                    .getLastVoteSchedule()
                    .orElseThrow();

            web3Service.endVote(VoteJobData.of(schedule));
        } catch (Exception e) {
            log.error("** 어드민 ** 최근 추가된 투표 종료 실패", e);
            return BaseResponse.fail("** 어드민 ** 최근 추가된 투표 종료 실패");
        }
        return BaseResponse.success();
    }

    @GetMapping("/endhardcoded")
    public ResponseEntity<?> endHardcoded() {
        log.info("** 어드민 ** 하드코딩 챌린지 종료");
        try {
            Schedule schedule = scheduleService
                    .getHardCodedOne()
                    .orElseThrow();

            web3Service.endVote(VoteJobData.of(schedule));
        } catch (Exception e) {
            log.error("** 어드민 ** 하드코딩 챌린지 종료 실패", e);
            return BaseResponse.fail("** 어드민 ** 하드코딩 챌린지 종료 실패");
        }
        return BaseResponse.success();
    }
}
