package com.ssafy.db.repository;

import com.ssafy.db.entity.Schedule;
import com.ssafy.web3.job.ChallengeType;
import com.ssafy.web3.job.ContractJobType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByTriggerAtGreaterThan(Long triggerAt);
    Optional<Schedule> findFirstByJobTypeAndChallengeTypeOrderByScheduleIdDesc(ContractJobType jobType, ChallengeType challengeType);
}
