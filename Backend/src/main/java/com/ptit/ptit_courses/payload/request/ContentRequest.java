package com.ptit.ptit_courses.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContentRequest {
    @JsonProperty("Name")
    private String name;

    @JsonProperty("DetailsId")
    private Long detailsId;

    @JsonProperty("videoURL")
    private String videoLink;

    @JsonProperty("documentURL")
    private String documentLink;
}
