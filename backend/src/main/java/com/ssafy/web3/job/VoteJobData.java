package com.ssafy.web3.job;

import com.ssafy.api.request.VoteScheduleRequest;
import com.ssafy.db.entity.Schedule;
import com.ssafy.web3.request.EndVoteRequest;
import com.ssafy.web3.service.Web3ServiceImpl;
import lombok.*;
import org.quartz.JobDataMap;

import java.time.Instant;
import java.util.Date;

@Data
@Builder
@ToString
public class VoteJobData {

    private Long voteId;
    private Long challengeId;
    private Long userId;
    private Long challengerId;
    private Long userIdIndex;
    private Long challengeIdIndex;
    private Long photoId;
    private Long triggerAt;

    public JobDataMap toJobData() {
        JobDataMap jobData = new JobDataMap();
        jobData.put("voteId", voteId);
        jobData.put("challengeId", challengeId);
        jobData.put("userId", userId);
        jobData.put("challengerId", challengerId);
        jobData.put("userIdIndex", userIdIndex);
        jobData.put("challengeIdIndex", challengeIdIndex);
        jobData.put("photoId", photoId);
        return jobData;
    }

    public Schedule toScheduleEntity() {
        return Schedule.builder()
                .jobType(ContractJobType.VOTE)
                .voteId(voteId)
                .challengeId(challengeId)
                .userId(userId)
                .challengerId(challengerId)
                .userIdIndex(userIdIndex)
                .challengeIdIndex(challengeIdIndex)
                .photoId(photoId)
                .triggerAt(triggerAt)
                .build();
    }

    public EndVoteRequest toEndVoteRequest() {
        return EndVoteRequest.builder()
                .voteId(voteId)
                .challengeId(challengeId)
                .userId(userId)
                .challengerId(challengerId)
                .userIdIndex(userIdIndex)
                .challengeIdIndex(challengeIdIndex)
                .photoId(photoId)
                .build();
    }

    public Date toDate() {
        return Date.from(Instant.ofEpochSecond(triggerAt));
    }

    public static VoteJobData of(VoteScheduleRequest voteScheduleRequest) {
        return VoteJobData.builder()
                .voteId(voteScheduleRequest.getVoteId())
                .challengeId(voteScheduleRequest.getChallengeId())
                .userId(voteScheduleRequest.getUserId())
                .challengerId(voteScheduleRequest.getChallengerId())
                .userIdIndex(voteScheduleRequest.getUserIdIndex())
                .challengeIdIndex(voteScheduleRequest.getChallengeIdIndex())
                .photoId(voteScheduleRequest.getPhotoId())
                .triggerAt(voteScheduleRequest.getTriggerAt())
                .build();
    }

    public static VoteJobData of(Schedule schedule) {
        return VoteJobData.builder()
                .voteId(schedule.getVoteId())
                .challengeId(schedule.getChallengeId())
                .userId(schedule.getUserId())
                .challengerId(schedule.getChallengerId())
                .userIdIndex(schedule.getUserIdIndex())
                .challengeIdIndex(schedule.getChallengeIdIndex())
                .photoId(schedule.getPhotoId())
                .triggerAt(schedule.getTriggerAt())
                .build();
    }

    public static VoteJobData of(JobDataMap jobData) {
        return VoteJobData.builder()
                .voteId(jobData.getLong("voteId"))
                .challengeId(jobData.getLong("challengeId"))
                .userId(jobData.getLong("userId"))
                .challengerId(jobData.getLong("challengerId"))
                .userIdIndex(jobData.getLong("userIdIndex"))
                .challengeIdIndex(jobData.getLong("challengeIdIndex"))
                .photoId(jobData.getLong("photoId"))
                .build();
    }
}
