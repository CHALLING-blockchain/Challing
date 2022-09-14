package com.ssafy.db.repository;

import com.ssafy.db.entity.Photo;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findAllByUser(User user);
    Optional<Photo> findByPhotoUrlAndUser(String photoUrl, User user);
}
