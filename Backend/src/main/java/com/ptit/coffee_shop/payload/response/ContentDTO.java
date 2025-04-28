package com.ptit.coffee_shop.payload.response;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.ptit.coffee_shop.model.Category;
import com.ptit.coffee_shop.model.Content;
import com.ptit.coffee_shop.model.Course;
import com.ptit.coffee_shop.model.Details;

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
