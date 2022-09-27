package com.ssafy.web3.job;

import com.ssafy.api.request.ChallengeScheduleRequest;
import com.ssafy.db.entity.Schedule;
import lombok.*;
import org.quartz.JobDataMap;

import java.time.Instant;
import java.util.Date;

@Data
@Builder
public class ChallengeJobData {

    private String challengeId;
    private Long triggerAt;

    public JobDataMap toJobData() {
        JobDataMap jobData = new JobDataMap();
        jobData.put("challengeId", challengeId);
        return jobData;
    }

    public Date toDate() {
        return Date.from(Instant.ofEpochSecond(triggerAt));
    }

    public Schedule toScheduleEntity() {
        return Schedule.builder()
                .challengeId(challengeId)
                .triggerAt(triggerAt)
                .build();
    }

    public static ChallengeJobData of(ChallengeScheduleRequest challengeScheduleRequest) {
        return ChallengeJobData.builder()
                .challengeId(challengeScheduleRequest.getChallengeId())
                .triggerAt(challengeScheduleRequest.getTriggerAt())
                .build();
    }

    public static ChallengeJobData of(Schedule schedule) {
        return ChallengeJobData.builder()
                .challengeId(schedule.getChallengeId())
                .triggerAt(schedule.getTriggerAt())
                .build();
    }

    public static ChallengeJobData of(JobDataMap jobData) {
        return ChallengeJobData.builder()
                .challengeId(jobData.getString("challengeId"))
                .build();
    }
}
