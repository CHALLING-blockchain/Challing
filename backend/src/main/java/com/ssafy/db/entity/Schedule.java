package com.ssafy.db.entity;

import com.ssafy.web3.job.ChallengeType;
import com.ssafy.web3.job.ContractJobType;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {

    @Id
    @GeneratedValue
    @Column(name = "schedule_id")
    private Long scheduleId;
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    private ContractJobType jobType;
    @Column(name = "challenge_id")
    private Long challengeId;
    @Column(name = "challenge_type")
    private ChallengeType challengeType;
    @Column(name = "vote_id")
    private Long voteId;
    @Column(name = "trigger_at")
    private Long triggerAt;

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "challenger_id")
    private Long challengerId;
    @Column(name = "user_id_index")
    private Long userIdIndex;
    @Column(name = "challenge_id_index")
    private Long challengeIdIndex;
}
