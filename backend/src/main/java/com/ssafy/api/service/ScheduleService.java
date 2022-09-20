package com.ssafy.api.service;

import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import org.quartz.SchedulerException;

public interface ScheduleService {
    void addChallengeSchedule(ChallengeJobData challengeJobData) throws SchedulerException;
    void addVoteSchedule(VoteJobData voteJobData) throws SchedulerException;
}
