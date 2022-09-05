package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Donation {
    @Id
    @GeneratedValue
    @Column(name="donation_id")
    private Long id;

    @Column(name="donation_name")
    private String name;
    private String publicKey;
    private String walletName;
    private String picURL;
    private String donationDesc;


}
