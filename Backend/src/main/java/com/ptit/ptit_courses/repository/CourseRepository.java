package com.ptit.ptit_courses.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ptit.ptit_courses.model.Course;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    // @Query("select * from course c")
    List<Course> findAll();

    List<Course> findByCategoryId(Long categoryId);

    @Query("SELECT c FROM Course c WHERE LOWER(c.name) LIKE CONCAT('%', LOWER(:keyword), '%')  OR LOWER(c.teacher) LIKE CONCAT('%', LOWER(:keyword), '%')")
    List<Course> findByKeyword(String keyword);
}