package com.ptit.ptit_courses.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.common.GsonUtil;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.PtitCoursesException;
import com.ptit.ptit_courses.payload.request.CommentRequest;

import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.service.CommentService;

@RestController
@RequestMapping("api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private MessageBuilder messageBuilder;

    @GetMapping("/get-comment/{contentId}")
    public ResponseEntity<String> getCommentByContentId(@PathVariable long contentId) {
        try {
            RespMessage respMessage = commentService.getCommentByContentId(contentId);
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(respMessage), HttpStatus.OK);
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

    @PostMapping("/add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> addComment(@RequestBody CommentRequest request) {
        try {
            RespMessage respMessage = commentService.addComment(request);
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(respMessage), HttpStatus.OK);
        } catch (PtitCoursesException e) {
            RespMessage respMessage = messageBuilder.buildFailureMessage(e.getCode(), e.getObjects(), e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(respMessage), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            RespMessage respMessage = messageBuilder.buildFailureMessage(Constant.UNDEFINED, null, e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(respMessage), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
