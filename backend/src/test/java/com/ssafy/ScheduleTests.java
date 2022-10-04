package com.ssafy;

import com.ssafy.db.entity.Schedule;
import com.ssafy.db.repository.ScheduleRepository;
import com.ssafy.web3.job.ChallengeType;
import com.ssafy.web3.job.ContractJobType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
public class ScheduleTests {

    @Autowired
    ScheduleRepository scheduleRepository;

    @Test
    void getLastTest() {
//        List<Schedule> all = scheduleRepository.findAll();
//        System.out.println("all: " + all);
        Optional<Schedule> challDai = scheduleRepository.findFirstByJobTypeAndChallengeTypeOrderByScheduleIdDesc(ContractJobType.CHALLENGE, ChallengeType.DAILY);
        System.out.println("challDai: " + challDai);
        Optional<Schedule> challDon = scheduleRepository.findFirstByJobTypeAndChallengeTypeOrderByScheduleIdDesc(ContractJobType.CHALLENGE, ChallengeType.DONATION);
        System.out.println("challDon: " + challDon);
        Optional<Schedule> vote = scheduleRepository.findFirstByJobTypeAndChallengeTypeOrderByScheduleIdDesc(ContractJobType.VOTE, null);
        System.out.println("vote: " + vote);
    }
}
