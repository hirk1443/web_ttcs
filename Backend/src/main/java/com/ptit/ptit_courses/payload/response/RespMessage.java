package com.ptit.ptit_courses.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class RespMessage {
    private String respCode;
    private String respDesc;
    private Object data;
}