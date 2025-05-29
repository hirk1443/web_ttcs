package com.ptit.ptit_courses.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.common.GsonUtil;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.PtitCoursesException;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.service.CloudinaryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image/upload")
public class UploadController {

    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private MessageBuilder messageBuilder;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            RespMessage respMessage = cloudinaryService.uploadImage(file, "images");
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(respMessage),
                    HttpStatus.OK);
        } catch (PtitCoursesException e) {
            RespMessage respMessage = messageBuilder.buildFailureMessage(e.getCode(),
                    e.getObjects(), e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(respMessage),
                    HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            RespMessage respMessage = messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null,
                    e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(respMessage),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}