package com.ssafy.api.controller;

import com.ssafy.api.response.BaseResponse;
import com.ssafy.api.response.UserLoginResponse;
import com.ssafy.api.response.UserResponse;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.common.util.KakaoApi;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final KakaoApi kakaoApi;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> requestBody) {
        String code = requestBody.get("code");
        logger.debug("code: {}", code);

        String accessToken = kakaoApi.getAccessToken(code);
        logger.debug("accessToken: {}", accessToken);

        HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);
        logger.debug("login info: {}", userInfo.toString());

        String email = (String) userInfo.get("email");

        if (userInfo.get("email") == null) {
            return BaseResponse.fail("noEmail");
        }

        User user = userService.getUserByEmail(email);

        if (user == null) {
            UserResponse userResponse = UserResponse.builder()
                    .email(email)
                    .picURL((String) userInfo.get("profile_image"))
                    .nickname((String) userInfo.get("nickname"))
                    .build();
            return BaseResponse.success(UserLoginResponse.builder()
                    .visited(false)
                    .user(userResponse)
                    .build());
        }

        String token = JwtTokenUtil.getToken(email);

        return BaseResponse.success(UserLoginResponse.builder()
                .visited(true)
                .jwt(token)
                .user(UserResponse.of(user))
                .build());
    }
}
