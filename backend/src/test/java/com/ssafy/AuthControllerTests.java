package com.ssafy;

import com.ssafy.api.controller.AuthController;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.AppUserDetailService;
import com.ssafy.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

    @Test
    void loginWhenNothingThen() throws Exception {
        MvcResult result = mvc.perform(get("/api/auth/login"))
                .andExpect(status().isOk())
                .andReturn();
        String okString = result.getResponse().getContentAsString();
        assertEquals("okay", okString, "okay 가 안 옴");
    }
}
