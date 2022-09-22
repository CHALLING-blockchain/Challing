package com.ssafy.api.service;

import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service("favoriteService")
@RequiredArgsConstructor
@Transactional
public class FavoriteServiceImpl implements FavoriteService{
    private final FavoriteRepository favoriteRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public List<Favorite> getFavoriteList(User user) {
        return favoriteRepository.findAllByUser(user);
    }

    @Override
    public void addFavorite(Long challengeId, User user) {
        favoriteRepository.save(Favorite.of(challengeId, user));
    }

    @Override
    public boolean deleteFavorite(Long challengeId, User user) {
        Optional<Favorite> favorite = favoriteRepository.findByChallengeIdAndUser(challengeId, user);
        if(favorite.isEmpty()){
            return false;
        }
        user.getFavorites().remove(favorite.get());
        favoriteRepository.delete(favorite.get());
        return true;
    }
}
