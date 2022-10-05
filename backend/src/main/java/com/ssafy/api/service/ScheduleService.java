package com.ssafy.api.service;

import com.ssafy.db.entity.Schedule;
import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJobData;
import org.quartz.SchedulerException;

import java.util.Optional;

public interface ScheduleService {
    void saveAndScheduleChallengeJob(ChallengeJobData jobData) throws SchedulerException;
    void saveAndScheduleVoteJob(VoteJobData jobData) throws SchedulerException;
    void saveChallengeJob(ChallengeJobData jobData);
    void saveVoteJob(VoteJobData jobData);
    void scheduleChallengeJob(ChallengeJobData jobData) throws SchedulerException;
    void scheduleVoteJob(VoteJobData jobData) throws SchedulerException;
    Optional<Schedule> getLastDailyChallengeSchedule();
    Optional<Schedule> getLastDonationChallengeSchedule();
    Optional<Schedule> getLastVoteSchedule();
    Optional<Schedule> getHardCodedOne();
}
