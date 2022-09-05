package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Challenge {
    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interest_id")
    private Interest interest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id")
    private Donation donation;

    @Column(name="challenge_name")
    private String name;
    private String authMethod;
    private int authWeekTimes;
    private int authDayTimes;
    private boolean allowGallery;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isSecret;
    private String password;
    private String picURL;
    private String challengeDesc;
    private String gdPicURL;
    private String badPicURL;
    private boolean challengeResult;
    private boolean isDonation;
    private int hostDonationAmount;
    private int deposit;
    private int successStandard;




}
