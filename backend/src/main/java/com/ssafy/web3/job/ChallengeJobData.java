package com.ssafy.web3.job;

import com.ssafy.api.request.ChallengeScheduleRequest;
import com.ssafy.db.entity.Schedule;
import lombok.*;
import org.quartz.JobDataMap;

import java.time.Instant;
import java.util.Date;

@Data
@Builder
@ToString
public class ChallengeJobData {

    private Long challengeId;
    private ChallengeType challengeType;
    private Long triggerAt;

    public JobDataMap toJobData() {
        JobDataMap jobData = new JobDataMap();
        jobData.put("challengeId", challengeId);
        jobData.put("challengeType", challengeType);
        return jobData;
    }

    public Date toDate() {
        return Date.from(Instant.ofEpochSecond(triggerAt));
    }

    public Schedule toScheduleEntity() {
        return Schedule.builder()
                .jobType(ContractJobType.CHALLENGE)
                .challengeId(challengeId)
                .challengeType(challengeType)
                .triggerAt(triggerAt)
                .build();
    }

    public static ChallengeJobData of(ChallengeScheduleRequest challengeScheduleRequest) {
        return ChallengeJobData.builder()
                .challengeId(challengeScheduleRequest.getChallengeId())
                .challengeType(challengeScheduleRequest.getChallengeType())
                .triggerAt(challengeScheduleRequest.getTriggerAt())
                .build();
    }

    public static ChallengeJobData of(Schedule schedule) {
        return ChallengeJobData.builder()
                .challengeId(schedule.getChallengeId())
                .challengeType(schedule.getChallengeType())
                .triggerAt(schedule.getTriggerAt())
                .build();
    }

    public static ChallengeJobData of(JobDataMap jobData) {
        return ChallengeJobData.builder()
                .challengeId(jobData.getLong("challengeId"))
                .challengeType((ChallengeType) jobData.get("challengeType"))
                .build();
    }
}
