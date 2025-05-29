package com.ptit.ptit_courses.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.ptit_courses.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByContentId(Long id);
}
