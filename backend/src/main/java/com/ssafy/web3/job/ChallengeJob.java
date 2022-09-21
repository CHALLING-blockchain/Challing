package com.ssafy.web3.job;

import com.ssafy.web3.service.Web3Service;
import lombok.RequiredArgsConstructor;
import org.quartz.*;

import java.util.Date;

@RequiredArgsConstructor
public class ChallengeJob implements Job {

    private final Web3Service web3Service;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDataMap jobData = context.getJobDetail().getJobDataMap();
        web3Service.endChallenge(ChallengeJobData.of(jobData));
    }

    public static JobDetail newChallengeJob(ChallengeJobData challengeJobData) {
        return JobBuilder.newJob(ChallengeJob.class).setJobData(challengeJobData.toJobData()).build();
    }

    public static Trigger newTrigger(ChallengeJobData challengeJobData) {
        Date date = challengeJobData.toDate();
        return TriggerBuilder.newTrigger().startAt(date).endAt(date).build();
    }
}
