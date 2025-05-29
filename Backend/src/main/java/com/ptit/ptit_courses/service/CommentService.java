package com.ptit.ptit_courses.service;

import java.lang.classfile.ClassFile.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.PtitCoursesException;
import com.ptit.ptit_courses.model.Comment;
import com.ptit.ptit_courses.model.Content;
import com.ptit.ptit_courses.model.User;
import com.ptit.ptit_courses.payload.request.CommentRequest;
import com.ptit.ptit_courses.payload.response.CommentDTO;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.repository.CommentRepository;
import com.ptit.ptit_courses.repository.ContentRepository;
import com.ptit.ptit_courses.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageBuilder messageBuilder;

    public RespMessage addComment(CommentRequest commentRequest) {
        if (commentRequest.getBody() == null || commentRequest.getBody().isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_NULL, new Object[] { "name" },
                    "comment body must be not null");
        }
        Optional<User> userOption = userRepository.findById(commentRequest.getUserId());
        if (!userOption.isPresent()) {
            throw new PtitCoursesException(Constant.NOT_FOUND, new Object[] { "name" },
                    "user not found");
        }
        Optional<Content> contentOptional = contentRepository.findById(commentRequest.getContentId());
        if (!contentOptional.isPresent()) {
            throw new PtitCoursesException(Constant.NOT_FOUND, new Object[] { "name" },
                    "content not found");
        }
        Comment comment = new Comment();
        comment.setAuthor(userOption.get());
        comment.setBody(commentRequest.getBody());
        comment.setContent(contentOptional.get());
        comment.setCreated_at(new Date());
        comment.setUpdated_at(new Date());
        try {
            commentRepository.save(comment);
        } catch (Exception e) {
            throw new PtitCoursesException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when add comment");
        }
        return messageBuilder.buildSuccessMessage(new Object[] { "add comment suceesfully" });
    }

    public RespMessage getCommentByContentId(Long id) {
        try {
            List<Comment> comments = commentRepository.findByContentId(id);
            List<CommentDTO> result = comments.stream().map(CommentDTO::new).collect(Collectors.toList());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);
        }
    }
}
