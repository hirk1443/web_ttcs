package com.ptit.ptit_courses.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ptit.ptit_courses.common.enums.RoleEnum;
import com.ptit.ptit_courses.model.Role;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByName(RoleEnum name);

    Optional<Role> findByName(RoleEnum name);

    Optional<Role> getRoleByName(RoleEnum name);
}