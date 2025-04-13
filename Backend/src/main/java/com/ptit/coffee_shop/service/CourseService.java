package com.ptit.coffee_shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.coffee_shop.config.MessageBuilder;
import com.ptit.coffee_shop.model.Course;
import com.ptit.coffee_shop.payload.response.RespMessage;
import com.ptit.coffee_shop.repository.CourseRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private MessageBuilder messageBuilder;


    public RespMessage getAllCourses() {
        List<Course> courses = courseRepository.getAllCourse();
        return messageBuilder.buildSuccessMessage(courses);
    }
}
