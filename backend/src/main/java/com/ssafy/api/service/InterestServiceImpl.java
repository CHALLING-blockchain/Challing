package com.ssafy.api.service;

import com.ssafy.db.entity.Interest;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserInterest;
import com.ssafy.db.repository.InterestRepository;
import com.ssafy.db.repository.UserInterestRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("interestService")
@RequiredArgsConstructor
public class InterestServiceImpl implements InterestService{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserInterestRepository userInterestRepository;
    private final InterestRepository interestRepository;

    @Override
    public List<UserInterest> getInterest(User user) {
        return userInterestRepository.findAllByUser(user);
    }

    @Override
    public List<UserInterest> insertInterest(List<String> interests, User user) {
        List<UserInterest> userInterests = new ArrayList<>();
        for (String i : interests){
            Optional<Interest> optionalInterest = interestRepository.findByName(i);
            if(optionalInterest.isEmpty()){
                Interest interest = interestRepository.save(Interest.of(i));
                userInterests.add(userInterestRepository.save(UserInterest.of(interest, user)));
            }
            else userInterests.add(userInterestRepository.save(UserInterest.of(optionalInterest.get(), user)));
        }
        return userInterests;
    }
}
