package com.ssafy.api.service;

import com.ssafy.db.entity.User;

public interface UserInterestService {
    boolean deleteAllByUser(User user);
}
