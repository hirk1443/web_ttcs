package com.ptit.coffee_shop.repository;

import com.ptit.coffee_shop.common.enums.DocumentStatusEnum;

import com.ptit.coffee_shop.model.Document;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAll();

    @Query("SELECT d FROM Document d WHERE LOWER(d.name) LIKE CONCAT('%', LOWER(:keyword), '%')")
    List<Document> findByKeyword(String keyword);

    List<Document> findByStatus(DocumentStatusEnum status);

    List<Document> findByAuthor_Id(Long userId);
}