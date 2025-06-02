package com.ptit.ptit_courses.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.common.enums.Status;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.PtitCoursesException;
import com.ptit.ptit_courses.model.User;
import com.ptit.ptit_courses.payload.request.UserRequest;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.payload.response.UserDTO;
import com.ptit.ptit_courses.repository.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageBuilder messageBuilder;

    public RespMessage getAllUsers() {
        List<User> users = userRepository.getAllUser();
        List<UserDTO> userDTOS = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setName(user.getName());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhone(user.getPhone());
            userDTO.setProfile_img(userDTO.getProfile_img());
            userDTO.setRoleName("ROLE_USER");
            userDTO.setStatus(user.getStatus().toString());
            userDTOS.add(userDTO);
        }
        return messageBuilder.buildSuccessMessage(userDTOS);
    }

    public RespMessage getUserById() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new PtitCoursesException(Constant.FIELD_NOT_FOUND, new Object[] { "User" },
                        "User not found when change password"));
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhone());
        userDTO.setProfile_img(user.getProfile_img());
        userDTO.setStatus(user.getStatus().toString());
        userDTO.setRoleName("ROLE_USER");
        return messageBuilder.buildSuccessMessage(userDTO);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public RespMessage banUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(Status.INACTIVE);
            UserDTO newUserDTO = new UserDTO();
            newUserDTO.setId(user.getId());
            newUserDTO.setName(user.getName());
            newUserDTO.setEmail(user.getEmail());
            newUserDTO.setPhone(user.getPhone());
            newUserDTO.setProfile_img(user.getProfile_img());
            newUserDTO.setStatus(Status.INACTIVE.toString());
            try {
                userRepository.save(user);
                return messageBuilder.buildSuccessMessage(newUserDTO);
            } catch (PtitCoursesException e) {
                throw new PtitCoursesException(Constant.SYSTEM_ERROR, new Object[] { "user" },
                        "User could not be banned");
            }
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    public RespMessage unbanUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(Status.ACTIVE);
            UserDTO updatedUserDTO = new UserDTO();
            updatedUserDTO.setId(user.getId());
            updatedUserDTO.setName(user.getName());
            updatedUserDTO.setEmail(user.getEmail());
            updatedUserDTO.setPhone(user.getPhone());
            updatedUserDTO.setProfile_img(user.getProfile_img());
            updatedUserDTO.setStatus(Status.ACTIVE.toString());
            try {
                userRepository.save(user);
                return messageBuilder.buildSuccessMessage(updatedUserDTO);
            } catch (PtitCoursesException e) {
                throw new PtitCoursesException(Constant.SYSTEM_ERROR, new Object[] { "user" },
                        "User could not be unbanned");
            }
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    public RespMessage updateUserInfo(UserRequest updatedUser) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new PtitCoursesException(Constant.FIELD_NOT_FOUND, new Object[] { "User" },
                        "User not found when change password"));
        currentUser.setName(updatedUser.getName());
        currentUser.setPhone(updatedUser.getPhone());
        currentUser.setUpdated_at(new Date());
        currentUser.setProfile_img(updatedUser.getProfileImg());
        try {
            userRepository.save(currentUser);
            return messageBuilder.buildSuccessMessage(updatedUser);
        } catch (PtitCoursesException e) {
            throw new PtitCoursesException(Constant.SYSTEM_ERROR, new Object[] { "user" },
                    "UserInfo could not be updated");
        }
    }

    public RespMessage updateAvatar(String Url, Long userId) {

        try {
            Optional<User> user = userRepository.findById(userId);
            if (!user.isPresent()) {
                throw new PtitCoursesException(Constant.FIELD_NOT_FOUND, new Object[] { "User" },
                        "user not found");
            }
            User updatedUser = user.get();
            updatedUser.setProfile_img(Url);
            userRepository.save(updatedUser);

            return messageBuilder.buildSuccessMessage("success");
        } catch (Exception e) {
            throw new PtitCoursesException(Constant.SYSTEM_ERROR, new Object[] { "user" },
                    "UserInfo could not be updated");
        }

    }
}
