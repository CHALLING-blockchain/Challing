package com.ssafy.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.api.request.UserRegisterRequest;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class User {
    @Id
    @GeneratedValue
    @Column(name="user_id")
    private Long id;

    private String email;
    private String nickname;
    private String picURL;
    private String description;

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<UserInterest> userInterest = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Favorite> favorites = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Photo> photos = new ArrayList<>();

    public static User of(UserRegisterRequest userRegisterRequest){
        return User.builder()
                .email(userRegisterRequest.getEmail())
                .nickname(userRegisterRequest.getNickname())
                .picURL(userRegisterRequest.getPicurl())
                .build();
    }

}
