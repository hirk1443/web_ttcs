package com.ptit.ptit_courses.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ptit.ptit_courses.model.Details;

@Repository
public interface DetailsRepository extends JpaRepository<Details, Long> {

    List<Details> findByCourseId(long courseId);
}