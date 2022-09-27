package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterRequest;
import com.ssafy.api.request.UserUpdateRequest;
import com.ssafy.db.entity.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserByEmail(String email);

    Optional<User> getUserById(Long id);

    User registerUser(UserRegisterRequest userRegisterInfo);
    @Transactional
    User updateUser(UserUpdateRequest userUpdateInfo);
    boolean nicknameValid(String nickname);
}
