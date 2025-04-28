package com.ptit.coffee_shop.payload.response;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.ptit.coffee_shop.model.Course;
import com.ptit.coffee_shop.model.Details;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailsDTO {
    private Long id;
    private String name;
    private String imageURL;
    private String description;
    private String createdAt;
    private String updatedAt;
    private CourseDTO course;

    public DetailsDTO(Details d) {
        this.id = d.getId();
        this.name = d.getName();
        this.imageURL = d.getImageURL();
        this.description = d.getDescription();
        this.createdAt = formatDate(d.getCreated_at());
        this.updatedAt = formatDate(d.getUpdated_at());
        this.course = new CourseDTO(d.getCourse());
    }

    private String formatDate(Date date) {
        if (date == null)
            return null;
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
    }
}
