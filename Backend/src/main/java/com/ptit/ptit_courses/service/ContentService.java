package com.ptit.ptit_courses.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.PtitCoursesException;
import com.ptit.ptit_courses.model.Content;
import com.ptit.ptit_courses.model.Details;
import com.ptit.ptit_courses.payload.request.ContentRequest;
import com.ptit.ptit_courses.payload.response.ContentDTO;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.repository.ContentRepository;
import com.ptit.ptit_courses.repository.DetailsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private DetailsRepository detailsRepository;

    @Autowired
    private MessageBuilder messageBuilder;

    public RespMessage getAllContent() {
        List<Content> contents = contentRepository.findAll();

        List<ContentDTO> result = contents.stream().map(ContentDTO::new).collect(Collectors.toList());
        return messageBuilder.buildSuccessMessage(result);
    }

    public RespMessage getContentById(Long id) {
        try {
            Optional<Content> contentOptional = contentRepository.findById(id);

            ContentDTO result = new ContentDTO(contentOptional.get());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);
        }
    }

    public RespMessage deleteContent(Long id) {
        Optional<Content> contentOptional = contentRepository.findById(id);
        if (contentOptional.isEmpty()) {
            throw new PtitCoursesException(Constant.FIELD_NOT_FOUND, new Object[] { "content" }, "Content not found");
        } else {
            Content content = contentOptional.get();
            try {
                contentRepository.delete(content);
                return messageBuilder.buildSuccessMessage(new Object[] { "deleted" });
            } catch (Exception e) {
                return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);

            }
        }
    }

    public RespMessage addContent(ContentRequest contentRequest) {

        Content content = new Content();
        content.setTitle(contentRequest.getName());
        content.setDocumentLink(contentRequest.getDocumentLink());
        content.setVideoLink(contentRequest.getVideoLink());
        content.setUpdated_at(new Date());
        content.setCreated_at(new Date());
        Optional<Details> details = detailsRepository.findById(contentRequest.getDetailsId());

        content.setDetails(details.get());
        try {
            contentRepository.save(content);
        } catch (Exception e) {
            throw new PtitCoursesException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when add course");
        }
        return messageBuilder.buildSuccessMessage(new Object[] { "add course suceesfully" });
    }

    public RespMessage getContentByDetailsId(Long id) {
        try {
            List<Content> contents = contentRepository.findByDetailsId(id);

            List<ContentDTO> result = contents.stream().map(ContentDTO::new).collect(Collectors.toList());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);

        }
    }
}