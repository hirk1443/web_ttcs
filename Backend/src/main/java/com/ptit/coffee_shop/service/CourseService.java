package com.ptit.coffee_shop.service;

import java.util.List;
import java.util.Optional;
import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.coffee_shop.common.Constant;
import com.ptit.coffee_shop.config.MessageBuilder;
import com.ptit.coffee_shop.exception.CoffeeShopException;
import com.ptit.coffee_shop.model.Course;
import com.ptit.coffee_shop.payload.request.CourseRequest;
import com.ptit.coffee_shop.payload.response.RespMessage;
import com.ptit.coffee_shop.repository.CategoryRepository;
import com.ptit.coffee_shop.repository.CourseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private MessageBuilder messageBuilder;

    public RespMessage getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return messageBuilder.buildSuccessMessage(courses);
    }

    public RespMessage addCourse(CourseRequest courseRequest) {
        if (courseRequest.getName() == null || courseRequest.getName().isEmpty()) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "name" },
                    "Course name must be not null");
        }
        if (courseRequest.getCategoryId() <= 0) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "categoryId" },
                    "invalid category id");
        }
        if (courseRequest.getTeacher() == null || courseRequest.getTeacher().isEmpty()) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "teacher" },
                    "Teacher name must be not null");
        }
        if (courseRequest.getImageURL() == null || courseRequest.getImageURL().isEmpty()) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "imageUrl" },
                    "ImageURL name must be not null");
        }
        Optional<com.ptit.coffee_shop.model.Category> categoryOptional = categoryRepository
                .findById(courseRequest.getCategoryId());
        if (categoryOptional.isEmpty()) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "category" }, "invalid category id");
        }
        Course course = new Course();
        course.setName(courseRequest.getName());
        course.setCategory(categoryOptional.get());
        course.setImageURL(courseRequest.getImageURL());
        course.setTeacher(courseRequest.getTeacher());
        try {
            courseRepository.save(course);
        } catch (Exception e) {
            throw new CoffeeShopException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when add course");
        }
        return messageBuilder.buildSuccessMessage(new Object[] { "add course suceesfully" });
    }
}
