package com.ssafy.api.service;

import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.User;

import java.util.List;

public interface FavoriteService {

    List<Favorite> getFavoriteList(User user);
    void addFavorite(Long challengeId, User user);
    boolean deleteFavorite(Long challengeId, User user);
}
