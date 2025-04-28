
package com.ptit.coffee_shop.repository;

import com.ptit.coffee_shop.common.enums.RoleEnum;
import com.ptit.coffee_shop.model.Category;
import com.ptit.coffee_shop.model.Content;
import com.ptit.coffee_shop.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    List<Content> findByDetailsId(Long id);

}
