package com.ptit.ptit_courses.service;

import java.lang.classfile.ClassFile.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.PtitCoursesException;
import com.ptit.ptit_courses.model.Course;
import com.ptit.ptit_courses.payload.request.CourseRequest;
import com.ptit.ptit_courses.payload.response.CourseDTO;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.repository.CategoryRepository;
import com.ptit.ptit_courses.repository.CourseRepository;

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

        List<CourseDTO> result = courses.stream().map(CourseDTO::new).collect(Collectors.toList());
        return messageBuilder.buildSuccessMessage(result);
    }

    public RespMessage addCourse(CourseRequest courseRequest) {
        if (courseRequest.getName() == null || courseRequest.getName().isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "name" },
                    "Course name must be not null");
        }
        if (courseRequest.getCategoryId() <= 0) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "categoryId" },
                    "invalid category id");
        }
        if (courseRequest.getTeacher() == null || courseRequest.getTeacher().isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "teacher" },
                    "Teacher name must be not null");
        }
        if (courseRequest.getImageURL() == null || courseRequest.getImageURL().isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "imageUrl" },
                    "ImageURL name must be not null");
        }
        Optional<com.ptit.ptit_courses.model.Category> categoryOptional = categoryRepository
                .findById(courseRequest.getCategoryId());
        if (categoryOptional.isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "category" }, "invalid category id");
        }
        Course course = new Course();
        course.setName(courseRequest.getName());
        course.setCategory(categoryOptional.get());
        course.setImageURL(courseRequest.getImageURL());
        course.setTeacher(courseRequest.getTeacher());
        course.setCreated_at(new Date());
        course.setUpdated_at(new Date());
        try {
            courseRepository.save(course);
        } catch (Exception e) {
            throw new PtitCoursesException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when add course");
        }
        return messageBuilder.buildSuccessMessage(new Object[] { "add course suceesfully" });
    }

    public RespMessage updateCourse(CourseRequest courseRequest, Long courseId) {
        if (courseRequest.getName() == null || courseRequest.getName().isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "name" },
                    "Course name must be not null");
        }
        if (courseRequest.getCategoryId() <= 0) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "categoryId" },
                    "invalid category id");
        }
        if (courseRequest.getTeacher() == null || courseRequest.getTeacher().isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "teacher" },
                    "Teacher name must be not null");
        }
        // if (courseRequest.getImageURL() == null ||
        // courseRequest.getImageURL().isEmpty()) {
        // throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] {
        // "imageUrl" },
        // "ImageURL name must be not null");
        // }
        Optional<com.ptit.ptit_courses.model.Category> categoryOptional = categoryRepository
                .findById(courseRequest.getCategoryId());
        if (categoryOptional.isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "category" }, "invalid category id");
        }
        Optional<Course> courseOptional = courseRepository.findById(courseId);
        if (!courseOptional.isPresent()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "Course" },
                    "Course Not Found");
        }
        Course course = courseOptional.get();
        course.setName(courseRequest.getName());
        course.setCategory(categoryOptional.get());
        if (courseRequest.getImageURL() != null) {
            course.setImageURL(courseRequest.getImageURL());
        }

        course.setTeacher(courseRequest.getTeacher());
        course.setCreated_at(new Date());
        course.setUpdated_at(new Date());
        try {
            courseRepository.save(course);
        } catch (Exception e) {
            throw new PtitCoursesException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when add course");
        }
        return messageBuilder.buildSuccessMessage(new Object[] { "add course suceesfully" });
    }

    public RespMessage getCourseByCategoryId(Long categoryId) {
        try {
            List<Course> courses = courseRepository.findByCategoryId(categoryId);

            List<CourseDTO> result = courses.stream()
                    .map(CourseDTO::new)
                    .collect(Collectors.toList());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);

        }
    }

    public RespMessage getCourseByKeyword(String keyword) {
        try {
            List<Course> courses = courseRepository.findByKeyword(keyword);

            List<CourseDTO> result = courses.stream()
                    .map(CourseDTO::new)
                    .collect(Collectors.toList());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);

        }
    }

    public RespMessage getCourseById(Long id) {
        try {
            Optional<Course> course = courseRepository.findById(id);

            CourseDTO result = new CourseDTO(course.get());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);
        }
    }

    public RespMessage deleteCourse(Long id) {
        Optional<Course> courseOptional = courseRepository.findById(id);
        if (courseOptional.isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_FOUND, new Object[] { "course" }, "Course not found");
        } else {
            Course course = courseOptional.get();
            try {
                courseRepository.delete(course);
                return messageBuilder.buildSuccessMessage(new Object[] { "deleted" });
            } catch (Exception e) {
                return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);

            }
        }
    }
}
