package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Interest {
    @Id
    @GeneratedValue
    @Column(name="interest_id")
    private Long id;

    @Column(name="interest_name")
    private String name;

    @Builder.Default
    @OneToMany(
        mappedBy = "interest"
    )
    private List<UserInterest> userInterests = new ArrayList<>();

    public static Interest of(String name) {
        return Interest.builder().name(name).build();
    }
}
