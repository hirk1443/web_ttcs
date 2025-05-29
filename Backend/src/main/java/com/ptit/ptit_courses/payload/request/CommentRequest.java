package com.ptit.ptit_courses.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentRequest {
    @JsonProperty("userId")
    private long userId;
    @JsonProperty("body")
    private String body;
    @JsonProperty("contentId")
    private Long ContentId;
}
