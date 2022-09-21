package com.ssafy.api.response;

import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BaseResponse {

    private static Logger logger = LoggerFactory.getLogger(BaseResponse.class);

    @Builder.Default
    Boolean success = null;
    @Builder.Default
    String message = null;
    @Builder.Default
    Object body = null;

    public static ResponseEntity<?> success(){
        logger.debug("\n\n결과 바디가 없는 OK 응답이 나갈 것입니다.\n");
        return ResponseEntity.ok().body(BaseResponse.builder().success(true).build());
    }

    public static ResponseEntity<?> success(Object body) {
        logger.debug("\n\n결과 바디가 있는 OK 응답이 나갈 것입니다.\n\n바디 : {}\n", body);
        return ResponseEntity.ok().body(BaseResponse.builder().success(true).body(body).build());
    }

    public static ResponseEntity<?> fail(String message) {
        logger.debug("\n\n!!!실패 응답이 나갈 것입니다!!!\n\n메시지 : {}\n", message);
        return ResponseEntity.ok().body(BaseResponse.builder().success(false).message(message).build());
    }
}