package com.ssafy.api.response;

import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.Photo;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserInterest;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String email;
    private String nickname;
    private String picURL;
    private String description;
    @Builder.Default
    private List<String> interests = new ArrayList<>();
    @Builder.Default
    private List<Long> challengeIds = new ArrayList<>();
    @Builder.Default
    private List<String> photos = new ArrayList<>();

    public static UserResponse of(User user){
        List<String> newInterests;
        try {
            List<UserInterest> interests = user.getUserInterest();
            newInterests = new ArrayList<>();
            for (UserInterest i : interests) {
                newInterests.add(i.getInterest().getName());
            }
        }
        catch (Exception e){
            newInterests = null;
        }

        List<Long> newChallengeIds;
        try {
            List<Favorite> favorites = user.getFavorites();
            newChallengeIds = new ArrayList<>();
            for(Favorite favorite : favorites) {
                newChallengeIds.add(favorite.getChallengeId());
            }
        } catch (Exception e) {
            newChallengeIds = null;
        }

        List<String> newPhotos;
        try {
            List<Photo> photos = user.getPhotos();
            newPhotos = new ArrayList<>();
            for(Photo photo : photos) {
                newPhotos.add(photo.getPhotoUrl());
            }
        } catch (Exception e) {
            newPhotos = null;
        }

        return UserResponse.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .picURL(user.getPicURL())
                .description(user.getDescription())
                .interests(newInterests)
                .challengeIds(newChallengeIds)
                .photos(newPhotos)
                .build();
    }
}
