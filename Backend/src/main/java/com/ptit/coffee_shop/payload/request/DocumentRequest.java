package com.ptit.coffee_shop.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DocumentRequest {
    @JsonProperty("UserId")
    private Long userId;

    @JsonProperty("DocumentName")
    private String documentName;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("CategoryId")
    private Long categoryId;

    @JsonProperty("DocumentLink")
    private String documentLink;
}
