package com.ssafy.api.service;

import com.ssafy.db.repository.ScheduleRepository;
import com.ssafy.web3.job.ChallengeJob;
import com.ssafy.web3.job.ChallengeJobData;
import com.ssafy.web3.job.VoteJob;
import com.ssafy.web3.job.VoteJobData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final Scheduler scheduler;

    @PostConstruct
    @Transactional(rollbackFor = Exception.class)
    public void loadSchedule() throws SchedulerException {
        log.info("초기 스케줄 데이터 로드");
        // TODO: 초기 스케줄 데이터 로드 구현
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addChallengeSchedule(ChallengeJobData jobData) throws SchedulerException {

        JobDetail job = ChallengeJob.newChallengeJob(jobData);
        Trigger trigger = ChallengeJob.newTrigger(jobData);

        log.info("챌린지 종료 스케줄 추가:\nchallengeId: {}\ntriggerAt: {}",
                jobData.getChallengeId(),
                jobData.getTriggerAt());

        scheduleRepository.save(jobData.toScheduleEntity());

        scheduler.scheduleJob(job, trigger);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addVoteSchedule(VoteJobData jobData) throws SchedulerException {

        JobDetail job = VoteJob.newVoteJob(jobData);
        Trigger trigger = VoteJob.newTrigger(jobData);

        log.info("투표 종료 스케줄 추가\nchallengeId: {}\nvoteId: {}\nchallengerId: {}\ntriggerAt: {}",
                jobData.getChallengeId(),
                jobData.getVoteId(),
                jobData.getChallengerId(),
                jobData.getTriggerAt());

        scheduleRepository.save(jobData.toScheduleEntity());

        scheduler.scheduleJob(job, trigger);
    }
}
