package com.ptit.ptit_courses.payload.response;

import java.util.Date;

import com.ptit.ptit_courses.model.Content;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContentDTO {
    private Long id;
    private String name;
    private String documentLink;
    private String videoLink;
    private Date createdAt;
    private Date updatedAt;
    private DetailsDTO details;

    public ContentDTO(Content c) {
        this.id = c.getId();
        this.name = c.getTitle();
        this.createdAt = c.getCreated_at();
        this.updatedAt = c.getUpdated_at();
        this.details = new DetailsDTO(c.getDetails());
        this.documentLink = c.getDocumentLink();
        this.videoLink = c.getVideoLink();
    }
}
