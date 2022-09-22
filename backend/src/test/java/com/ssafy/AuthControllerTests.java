package com.ssafy;

import com.ssafy.api.controller.AuthController;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.AppUserDetailService;
import com.ssafy.common.util.KakaoApi;
import com.ssafy.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest({AuthController.class})
@Import(SecurityConfig.class)
public class AuthControllerTests {

    @Autowired
    MockMvc mvc;

    @MockBean
    AppUserDetailService appUserDetailService;

    @MockBean
    UserService userService;

    @MockBean
    KakaoApi kakaoApi;

    @Test
    void loginWhenInvalidCodeThen4xx() throws Exception {
        MvcResult result = mvc.perform(post("/api/auth/login")
                        .content("\"code\":\"말도 안 되는 코드\"")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andReturn();
    }
}
