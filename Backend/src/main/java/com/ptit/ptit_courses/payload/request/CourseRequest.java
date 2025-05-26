package com.ptit.ptit_courses.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseRequest {
    @JsonProperty("Name")
    private String name;

    @JsonProperty("Image")
    private String imageURL;

    @JsonProperty("CategoryId")
    private long categoryId;

    @JsonProperty("Teacher")
    private String teacher;
}
