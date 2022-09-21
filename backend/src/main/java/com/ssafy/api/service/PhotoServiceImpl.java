package com.ssafy.api.service;

import com.ssafy.db.entity.Photo;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service("photoService")
@RequiredArgsConstructor
@Transactional
public class PhotoServiceImpl implements PhotoService{

    private final PhotoRepository photoRepository;

    @Override
    public List<Photo> getPhotoList(User user) {
        return photoRepository.findAllByUser(user);
    }

    @Override
    public void addPhoto(String photoUrl, User user) {
        photoRepository.save(Photo.of(photoUrl, user));
    }

    @Override
    public boolean deletePhoto(String photoUrl, User user) {
        Optional<Photo> optionalPhoto = photoRepository.findByPhotoUrlAndUser(photoUrl, user);
        if(optionalPhoto.isEmpty()){
            return false;
        }
        user.getPhotos().remove(optionalPhoto.get());
        photoRepository.delete(optionalPhoto.get());
        return true;
    }
}
