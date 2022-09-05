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
public class Interest {
    @Id
    @GeneratedValue
    @Column(name="interest_id")
    private Long id;

    @Column(name="interest_name")
    private String name;
}
