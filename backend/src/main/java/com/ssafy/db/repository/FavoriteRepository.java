package com.ssafy.db.repository;

import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findAllByUser(User user);

    Optional<Favorite> findByChallengeIdAndUser(Long challengeId, User user);
}
