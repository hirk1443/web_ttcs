
package com.ptit.coffee_shop.repository;

import com.ptit.coffee_shop.model.Content;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    List<Content> findByDetailsId(Long id);

}
