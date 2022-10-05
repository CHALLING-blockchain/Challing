package com.ssafy.api.service;

import com.ssafy.db.entity.Schedule;
import com.ssafy.db.repository.ScheduleRepository;
import com.ssafy.web3.job.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final Scheduler scheduler;
    @Value("${com.ssafy.save_dummy_job}")
    private Boolean SAVE_DUMMY_JOB;
    @Value("${com.ssafy.hardcoded_challenge_id}")
    private Long CHALLENGE_ID;

    @PostConstruct
    @Transactional(rollbackFor = Exception.class)
    public void initSchedule() throws SchedulerException {

        if (SAVE_DUMMY_JOB) {
            saveDummyJob();
        } else {
            log.info("더미 스케줄 저장 건너 뜀: com.ssafy.save_dummy_job: {}", SAVE_DUMMY_JOB);
        }

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

    private static class NumGen {
        private long num;
        private final long interval = 15L;

        NumGen(long initNum) {
            num = initNum - interval;
        }

        long next() {
            return num += interval;
        }

        long get() {
            return num;
        }
    }

    private void saveDummyJob() {

        log.info("더미 스케줄 저장");

        NumGen numGen = new NumGen(Instant.now().getEpochSecond() + 5L);

        long DUMMY_NUM = 987654321L;

        scheduleRepository.save(ChallengeJobData.builder()
                .challengeId(DUMMY_NUM)
                .challengeType(ChallengeType.DAILY)
                .triggerAt(numGen.next())
                .build()
                .toScheduleEntity());

        scheduleRepository.save(ChallengeJobData.builder()
                .challengeId(DUMMY_NUM)
                .challengeType(ChallengeType.DONATION)
                .triggerAt(numGen.next())
                .build()
                .toScheduleEntity());

        scheduleRepository.save(VoteJobData.builder()
                .voteId(DUMMY_NUM)
                .challengeId(DUMMY_NUM)
                .userId(DUMMY_NUM)
                .challengerId(DUMMY_NUM)
                .userIdIndex(DUMMY_NUM)
                .challengeIdIndex(DUMMY_NUM)
                .triggerAt(numGen.next())
                .build()
                .toScheduleEntity());
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

        log.info("챌린지 종료 스케줄 저장\n{}", jobData);

        scheduleRepository.save(jobData.toScheduleEntity());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveVoteJob(VoteJobData jobData) {

        log.info("투표 종료 스케줄 저장\n{}", jobData);

        scheduleRepository.save(jobData.toScheduleEntity());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void scheduleChallengeJob(ChallengeJobData jobData) throws SchedulerException {

        log.info("챌린지 종료 스케줄링\n{}", jobData);

        scheduler.scheduleJob(ChallengeJob.newChallengeJob(jobData), ChallengeJob.newTrigger(jobData));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void scheduleVoteJob(VoteJobData jobData) throws SchedulerException {

        log.info("투표 종료 스케줄링\n{}", jobData);

        scheduler.scheduleJob(VoteJob.newVoteJob(jobData), VoteJob.newTrigger(jobData));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Schedule> getLastDailyChallengeSchedule() {
        return scheduleRepository
                .findFirstByJobTypeAndChallengeTypeOrderByScheduleIdDesc(
                        ContractJobType.CHALLENGE, ChallengeType.DAILY);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Schedule> getLastDonationChallengeSchedule() {
        return scheduleRepository
                .findFirstByJobTypeAndChallengeTypeOrderByScheduleIdDesc(
                        ContractJobType.CHALLENGE, ChallengeType.DONATION);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Schedule> getLastVoteSchedule() {
        return scheduleRepository
                .findFirstByJobTypeAndChallengeTypeOrderByScheduleIdDesc(
                        ContractJobType.VOTE, null);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Schedule> getHardCodedOne() {
        return scheduleRepository
                .findByJobTypeAndChallengeTypeAndChallengeId(
                        ContractJobType.CHALLENGE, ChallengeType.DAILY, CHALLENGE_ID);
    }
}
