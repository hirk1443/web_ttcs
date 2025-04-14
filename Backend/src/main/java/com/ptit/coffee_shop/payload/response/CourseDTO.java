package com.ptit.coffee_shop.payload.response;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.ptit.coffee_shop.model.Category;
import com.ptit.coffee_shop.model.Course;
import com.ptit.coffee_shop.model.Details;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private Long id;
    private String name;
    private String teacher;
    private String imageURL;
    private Category category;

    public CourseDTO(Course c) {
        this.id = c.getId();
        this.name = c.getName();
        this.imageURL = c.getImageURL();
        this.teacher = c.getTeacher();
        this.category = c.getCategory();
    }
}
