package com.ssafy.api.service;

import com.ssafy.db.entity.Schedule;
import com.ssafy.db.repository.ScheduleRepository;
import com.ssafy.web3.job.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final Scheduler scheduler;

    @PostConstruct
    @Transactional(rollbackFor = Exception.class)
    public void initSchedule() throws SchedulerException {

        saveDummyJob();

        log.info("초기 스케줄 데이터 로드");

        List<Schedule> schedules = scheduleRepository.findAllByTriggerAtGreaterThan(Instant.now().getEpochSecond());

        for (Schedule schedule : schedules) {
            switch (schedule.getJobType()) {
                case CHALLENGE:
                    scheduleChallengeJob(ChallengeJobData.of(schedule));
                    break;
                case VOTE:
                    scheduleVoteJob(VoteJobData.of(schedule));
                    break;
            }
        }
    }

    private void saveDummyJob() {

        log.info("더미 스케줄 저장");

        long now = Instant.now().getEpochSecond();
        IntStream.of(10, 15, 20).forEach(s -> {
            scheduleRepository.save(ChallengeJobData.builder()
                    .challengeId("dummy" + (now + s))
                    .triggerAt(now + s)
                    .build()
                    .toScheduleEntity());
        });
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveAndScheduleChallengeJob(ChallengeJobData jobData) throws SchedulerException {
        saveChallengeJob(jobData);
        scheduleChallengeJob(jobData);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveAndScheduleVoteJob(VoteJobData jobData) throws SchedulerException {
        saveVoteJob(jobData);
        scheduleVoteJob(jobData);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveChallengeJob(ChallengeJobData jobData) {

        log.info("챌린지 종료 스케줄 저장\nchallengeId: {}\ntriggerAt: {}",
                jobData.getChallengeId(),
                jobData.getTriggerAt());

        scheduleRepository.save(jobData.toScheduleEntity());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveVoteJob(VoteJobData jobData) {

        log.info("투표 종료 스케줄 저장\nchallengeId: {}\nvoteId: {}\nchallengerId: {}\ntriggerAt: {}",
                jobData.getChallengeId(),
                jobData.getVoteId(),
                jobData.getChallengerId(),
                jobData.getTriggerAt());

        scheduleRepository.save(jobData.toScheduleEntity());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void scheduleChallengeJob(ChallengeJobData jobData) throws SchedulerException {

        log.info("챌린지 종료 스케줄링\nchallengeId: {}\ntriggerAt: {}",
                jobData.getChallengeId(),
                jobData.getTriggerAt());

        scheduler.scheduleJob(ChallengeJob.newChallengeJob(jobData), ChallengeJob.newTrigger(jobData));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void scheduleVoteJob(VoteJobData jobData) throws SchedulerException {

        log.info("투표 종료 스케줄링\nchallengeId: {}\nvoteId: {}\nchallengerId: {}\ntriggerAt: {}",
                jobData.getChallengeId(),
                jobData.getVoteId(),
                jobData.getChallengerId(),
                jobData.getTriggerAt());

        scheduler.scheduleJob(VoteJob.newVoteJob(jobData), VoteJob.newTrigger(jobData));
    }
}
