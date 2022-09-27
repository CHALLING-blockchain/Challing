package com.ssafy.api.service;

import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import org.quartz.SchedulerException;

public interface ScheduleService {
    void saveAndScheduleChallengeJob(ChallengeJobData jobData) throws SchedulerException;
    void saveAndScheduleVoteJob(VoteJobData jobData) throws SchedulerException;
    void saveChallengeJob(ChallengeJobData jobData);
    void saveVoteJob(VoteJobData jobData);
    void scheduleChallengeJob(ChallengeJobData jobData) throws SchedulerException;
    void scheduleVoteJob(VoteJobData jobData) throws SchedulerException;
}
