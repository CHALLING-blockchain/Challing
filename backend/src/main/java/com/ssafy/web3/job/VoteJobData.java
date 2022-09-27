package com.ssafy.web3.job;

import com.ssafy.api.request.VoteScheduleRequest;
import com.ssafy.db.entity.Schedule;
import lombok.*;
import org.quartz.JobDataMap;

import java.time.Instant;
import java.util.Date;

@Data
@Builder
public class VoteJobData {

    private String challengeId;
    private String voteId;
    private String challengerId;
    private Long triggerAt;

    public JobDataMap toJobData() {
        JobDataMap jobData = new JobDataMap();
        jobData.put("challengeId", challengeId);
        jobData.put("voteId", voteId);
        jobData.put("challengerId", challengerId);
        return jobData;
    }

    public Schedule toScheduleEntity() {
        return Schedule.builder()
                .jobType(ContractJobType.VOTE)
                .challengeId(challengeId)
                .voteId(voteId)
                .challengerId(challengerId)
                .triggerAt(triggerAt)
                .build();
    }

    public Date toDate() {
        return Date.from(Instant.ofEpochSecond(triggerAt));
    }

    public static VoteJobData of(VoteScheduleRequest voteScheduleRequest) {
        return VoteJobData.builder()
                .challengeId(voteScheduleRequest.getChallengeId())
                .voteId(voteScheduleRequest.getVoteId())
                .challengerId(voteScheduleRequest.getChallengerId())
                .triggerAt(voteScheduleRequest.getTriggerAt())
                .build();
    }

    public static VoteJobData of(Schedule schedule) {
        return VoteJobData.builder()
                .challengeId(schedule.getChallengeId())
                .voteId(schedule.getVoteId())
                .challengerId(schedule.getChallengerId())
                .triggerAt(schedule.getTriggerAt())
                .build();
    }

    public static VoteJobData of(JobDataMap jobData) {
        return VoteJobData.builder()
                .challengeId(jobData.getString("challengeId"))
                .voteId(jobData.getString("voteId"))
                .challengerId(jobData.getString("challengerId"))
                .build();
    }
}
