package com.ssafy.db.entity;

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
    private String challengeId;
    @Column(name = "challenger_id")
    private String challengerId;
    @Column(name = "vote_id")
    private String voteId;
    @Column(name = "trigger_at")
    private Long triggerAt;
}
