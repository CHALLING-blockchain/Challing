package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterRequest;
import com.ssafy.api.request.UserUpdateRequest;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final InterestService interestService;
    private final UserInterestService userInterestService;

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User registerUser(UserRegisterRequest userRegisterInfo) {
        User user = User.of(userRegisterInfo);
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public User updateUser(UserUpdateRequest userUpdateInfo) {
        Optional<User> optionalUser = userRepository.findByEmail(userUpdateInfo.getEmail());
        User updateUser = optionalUser.get();

        updateUser.setNickname(userUpdateInfo.getNickname());
        updateUser.setPicURL(userUpdateInfo.getPicURL());
        updateUser.setDescription(userUpdateInfo.getDescription());

        userInterestService.deleteAllByUser(updateUser);
        interestService.insertInterest(userUpdateInfo.getInterests(), updateUser);

        System.out.println("updateService");
        return updateUser;
    }

    @Override
    public boolean nicknameValid(String nickname) {
        if(userRepository.countAllByNickname(nickname) != 0){
            return false;
        }
        return true;
    }

}
