package com.ssafy.api.service;

import com.ssafy.db.entity.User;

public interface UserService {
    User getUserByEmail(String email);
}
