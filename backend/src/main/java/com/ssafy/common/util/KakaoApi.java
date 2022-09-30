/*
 * ref:
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code
 * https://antdev.tistory.com/36?category=807235
 */
package com.ssafy.common.util;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Component
public class KakaoApi {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String CLIENT_ID;
    private final String REDIRECT_URI;

    public KakaoApi(@Value("${com.ssafy.kakao.client_id}") String CLIENT_ID,
                    @Value("${com.ssafy.kakao.redirect_uri}") String REDIRECT_URI) {
        this.CLIENT_ID = CLIENT_ID;
        this.REDIRECT_URI = REDIRECT_URI;
    }

    public String getAccessToken(String code) {
        String accessToken = "";
        String refreshToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder()
                    .append("grant_type=authorization_code")
                    .append("&client_id=").append(CLIENT_ID)
                    .append("&redirect_uri=").append(REDIRECT_URI)
                    .append("&code=").append(code);

            logger.debug("body: {}", sb);

            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            logger.debug("\nresponse code = {}", responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            StringBuilder result = new StringBuilder();

            while ((line = br.readLine()) != null) {
                result.append(line);
            }
            logger.debug("\nresponse body = {}", result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result.toString());

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return accessToken;
    }

    public HashMap<String, Object> getUserInfo(String accessToken) {
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqUrl = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            int responseCode = conn.getResponseCode();
            logger.debug("\nresponse code = {}", responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            StringBuilder result = new StringBuilder();

            while ((line = br.readLine()) != null) {
                result.append(line);
            }
            logger.debug("\nresponse body = {}", result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result.toString());

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakaoAccount.getAsJsonObject().get("email").getAsString();
            String profile_image = properties.getAsJsonObject().get("profile_image").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);
            userInfo.put("profile_image", profile_image);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return userInfo;
    }

    public void kakaoLogout(String accessToken) {
        String reqURL = "http://kapi.kakao.com/v1/user/logout";
        try {
            logger.debug("\nkakao logout");

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            int responseCode = conn.getResponseCode();
            logger.debug("\nresponseCode = {}", responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            StringBuilder result = new StringBuilder();
            String line = "";

            while ((line = br.readLine()) != null) {
                result.append(line);
            }
            logger.debug("\nresult : {}", result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
