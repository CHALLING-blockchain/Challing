package com.ssafy.db.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue
    @Column(name="user_id")
    private Long id;

    private String email;
    private String nickname;
    private String picURL;



}
