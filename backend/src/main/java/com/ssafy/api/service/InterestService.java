package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserInterest;

import java.util.List;

public interface InterestService {
    List<UserInterest> getInterest(User user);
    List<UserInterest> insertInterest(List<String> interests, User user);
}
