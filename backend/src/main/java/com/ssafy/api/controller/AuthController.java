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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final KakaoApi kakaoApi;
    private final UserService userService;

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam("code") String code) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        logger.debug("code " + code);
        // 1번 인증코드 요청 전달

        String accessToken = kakaoApi.getAccessToken(code);

        logger.debug("accessToken : " + accessToken);
        // 2번 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);

        logger.debug("\n\nlogin info: {}\n", userInfo.toString());

        String token = JwtTokenUtil.getToken((String) userInfo.get("email"));

        String email = (String) userInfo.get("email");

        UserResponse userResponse = UserResponse.builder()
                .email(email)
                .picURL((String) userInfo.get("profile_image"))
                .nickname((String) userInfo.get("nickname"))
                .build();

        if (userInfo.get("email") == null) {
            return BaseResponse.fail("noEmail");
        }

        User user = userService.getUserByEmail(email);

        return BaseResponse.success(UserLoginResponse.builder()
                .visited(user == null ? false : true)
                .jwt(token)
                .user(UserResponse.of(user))
                .build());

    }
}
