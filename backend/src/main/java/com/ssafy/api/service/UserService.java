package com.ssafy.api.service;

import com.ssafy.db.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserByEmail(String email);
}
