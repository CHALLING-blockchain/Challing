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

    private String voteId;
    private Long triggerAt;

    public JobDataMap toJobData() {
        JobDataMap jobData = new JobDataMap();
        jobData.put("voteId", voteId);
        return jobData;
    }

    public Schedule toScheduleEntity() {
        return Schedule.builder()
                .jobType(ContractJobType.VOTE)
                .voteId(voteId)
                .triggerAt(triggerAt)
                .build();
    }

    public Date toDate() {
        return Date.from(Instant.ofEpochSecond(triggerAt));
    }

    public static VoteJobData of(VoteScheduleRequest voteScheduleRequest) {
        return VoteJobData.builder()
                .voteId(voteScheduleRequest.getVoteId())
                .triggerAt(voteScheduleRequest.getTriggerAt())
                .build();
    }

    public static VoteJobData of(Schedule schedule) {
        return VoteJobData.builder()
                .voteId(schedule.getVoteId())
                .triggerAt(schedule.getTriggerAt())
                .build();
    }

    public static VoteJobData of(JobDataMap jobData) {
        return VoteJobData.builder()
                .voteId(jobData.getString("voteId"))
                .build();
    }
}
