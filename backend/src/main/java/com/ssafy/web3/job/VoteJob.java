package com.ssafy.web3.job;

import com.ssafy.web3.service.Web3Service;
import lombok.RequiredArgsConstructor;
import org.quartz.*;

import java.util.Date;

@RequiredArgsConstructor
public class VoteJob implements Job {

    private final Web3Service web3Service;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDataMap jobData = context.getJobDetail().getJobDataMap();
        web3Service.endVote(VoteJobData.of(jobData));
    }

    public static JobDetail newVoteJob(VoteJobData voteJobData) {
        return JobBuilder.newJob(VoteJob.class).setJobData(voteJobData.toJobData()).build();
    }

    public static Trigger newTrigger(VoteJobData voteJobData) {
        Date date = voteJobData.toDate();
        return TriggerBuilder.newTrigger().startAt(date).endAt(date).build();
    }
}
