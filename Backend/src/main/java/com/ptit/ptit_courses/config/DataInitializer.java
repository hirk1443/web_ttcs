package com.ptit.ptit_courses.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.common.enums.RoleEnum;
import com.ptit.ptit_courses.common.enums.Status;
import com.ptit.ptit_courses.exception.PtitCoursesException;
import com.ptit.ptit_courses.model.Role;
import com.ptit.ptit_courses.model.User;
import com.ptit.ptit_courses.repository.RoleRepository;
import com.ptit.ptit_courses.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    @Value("${admin.email}")
    private String adminEmail;
    @Value("${admin.password}")
    private String adminPassword;

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        for (RoleEnum roleEnum : RoleEnum.values()) {
            if (!roleRepository.existsByName(roleEnum)) {
                Role role = new Role();
                role.setName(roleEnum);
                roleRepository.save(role);
            }
        }

        if (!userRepository.existsUserByEmail(adminEmail)) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            Role role = roleRepository.getRoleByName(RoleEnum.ROLE_ADMIN)
                    .orElseThrow(() -> new PtitCoursesException(Constant.FIELD_NOT_FOUND,
                            new Object[] { "DataInitializer.run" }, "Role Admin not found"));
            admin.setRole(role);
            admin.setStatus(Status.ACTIVE);

            userRepository.save(admin);
        }
    }
}
