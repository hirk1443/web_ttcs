package com.ptit.coffee_shop.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DetailsRequest {
    @JsonProperty("Name")
    private String name;

    @JsonProperty("ImageURL")
    private String imageURL;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("CourseId")
    private Long courseId;
}
