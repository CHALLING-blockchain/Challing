package com.ssafy.api.controller;

import com.ssafy.api.request.FavoriteRequest;
import com.ssafy.api.request.PhotoRequest;
import com.ssafy.api.request.UserRegisterRequest;
import com.ssafy.api.request.UserUpdateRequest;
import com.ssafy.api.response.BaseResponse;
import com.ssafy.api.response.UserResponse;
import com.ssafy.api.service.*;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserService userService;
    private final InterestService interestService;
    private final UserInterestService userInterestService;
    private final FavoriteService favoriteService;
    private final PhotoService photoService;

    @PostMapping("/join")
    @Transactional
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterRequest userInfo) {
        User user = userService.registerUser(userInfo);
        user.setUserInterest(interestService.insertInterest(userInfo.getInterests(), user));
        return BaseResponse.success(UserResponse.of(user));
    }

    @GetMapping("/mypage/{email}")
    @Transactional
    public ResponseEntity<?> getUserInfo(@PathVariable("email") String email){
        Optional<User> optionalUser = userService.getUserByEmail(email);
        if(optionalUser.isEmpty()){
            return BaseResponse.fail("없는 이메일 입니다.");
        }
        User user = optionalUser.get();
        logger.debug("\n\n{}", user);
        user.setUserInterest(interestService.getInterest(user));
        user.setFavorites(favoriteService.getFavoriteList(user));
        user.setPhotos(photoService.getPhotoList(user));
        return BaseResponse.success(UserResponse.of(user));
    }

    @GetMapping("/info/{id}")
    @Transactional
    public ResponseEntity<?> getUserInfoById(@PathVariable("id") long id) {
        Optional<User> optionalUser = userService.getUserById(id);
        if(optionalUser.isEmpty()){
            return BaseResponse.fail("없는 유저입니다.");
        }
        User user = optionalUser.get();
        logger.debug("\n\n{}", user);
        user.setUserInterest(interestService.getInterest(user));
        user.setFavorites(favoriteService.getFavoriteList(user));
        user.setPhotos(photoService.getPhotoList(user));
        return BaseResponse.success(UserResponse.of(user));
    }

    @PutMapping("/mypage")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateRequest updateInfo) {
        User user = userService.updateUser(updateInfo);
        return BaseResponse.success(UserResponse.of(user));
    }

    @GetMapping("/check/{nickname}")
    public ResponseEntity<?> validCheck(@PathVariable("nickname") String nickname){
        return BaseResponse.success(userService.nicknameValid(nickname));
    }

    @PostMapping("/favorite")
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteRequest favoriteRequest){
        String email = favoriteRequest.getEmail();
        Long challengeId = favoriteRequest.getChallengeId();
        Optional<User> optionalUser = userService.getUserByEmail(email);
        if(optionalUser.isEmpty()){
            return BaseResponse.fail("없는 이메일 입니다.");
        }
        User user = optionalUser.get();
        favoriteService.addFavorite(challengeId, user);
        return BaseResponse.success();
    }

    @Transactional
    @DeleteMapping("/favorite")
    public ResponseEntity<?> deleteFavorite(@RequestBody FavoriteRequest favoriteRequest){
        String email = favoriteRequest.getEmail();
        Long challengeId = favoriteRequest.getChallengeId();
        Optional<User> optionalUser = userService.getUserByEmail(email);
        if(optionalUser.isEmpty()){
            return BaseResponse.fail("없는 이메일 입니다.");
        }
        User user = optionalUser.get();
        if(favoriteService.deleteFavorite(challengeId, user)){
            return BaseResponse.success();
        }

        return BaseResponse.fail("즐겨찾기 삭제 실패");
    }

    @Transactional
    @PostMapping("/photo")
    public ResponseEntity<?> addPhoto(@RequestBody PhotoRequest photoRequest){
        Optional<User> optionalUser = userService.getUserByEmail(photoRequest.getEmail());
        if(optionalUser.isEmpty()){
            return BaseResponse.fail("없는 이메일 입니다.");
        }

        User user = optionalUser.get();
        photoService.addPhoto(photoRequest.getPhotoUrl(), user);
        return BaseResponse.success();
    }

    @Transactional
    @DeleteMapping("/photo")
    public ResponseEntity<?> deletePhoto(@RequestBody PhotoRequest photoRequest){
        Optional<User> optionalUser = userService.getUserByEmail(photoRequest.getEmail());
        if(optionalUser.isEmpty()){
            return BaseResponse.fail("없는 이메일 입니다.");
        }

        User user = optionalUser.get();
        if(photoService.deletePhoto(photoRequest.getPhotoUrl(), user)){
            return BaseResponse.success();
        }

        return BaseResponse.fail("인증사진 삭제 실패");
    }

}
