package com.ssafy.api.service;

import com.ssafy.db.entity.Photo;
import com.ssafy.db.entity.User;

import java.util.List;

public interface PhotoService {
    List<Photo> getPhotoList(User user);
    void addPhoto(String photoUrl, User user);
    boolean deletePhoto(String photoUrl, User user);
}
