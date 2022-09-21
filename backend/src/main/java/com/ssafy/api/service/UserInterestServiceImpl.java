package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserInterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("userInterestService")
@RequiredArgsConstructor
public class UserInterestServiceImpl implements UserInterestService{
    private final UserInterestRepository userInterestRepository;

    @Override
    public boolean deleteAllByUser(User user) {
        try{
            userInterestRepository.deleteAllByUser(user);
        } catch (Exception e){
            return false;
        }
        return true;
    }
}
