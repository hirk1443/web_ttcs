package com.ptit.ptit_courses.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.CoffeeShopException;
import com.ptit.ptit_courses.model.Course;
import com.ptit.ptit_courses.model.Details;
import com.ptit.ptit_courses.payload.request.DetailsRequest;
import com.ptit.ptit_courses.payload.response.DetailsDTO;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.repository.CourseRepository;
import com.ptit.ptit_courses.repository.DetailsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DetailsService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private DetailsRepository detailsRepository;

    @Autowired
    private MessageBuilder messageBuilder;

    public RespMessage addDetails(DetailsRequest detailsRequest) {
        if (detailsRequest.getCourseId() == null) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "name" },
                    "Course Id must be not null");
        }

        if (detailsRequest.getImageURL() == null || detailsRequest.getImageURL().isEmpty()) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "imageUrl" },
                    "ImageURL name must be not null");
        }
        if (detailsRequest.getName() == null || detailsRequest.getName().isEmpty()) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "name" },
                    "Details name must be not null");
        }

        Optional<Course> courseOptional = courseRepository.findById(detailsRequest.getCourseId());
        if (courseOptional.isEmpty()) {
            throw new CoffeeShopException(Constant.FIELD_NOT_NULL, new Object[] { "category" }, "Course Not Found");
        }
        Details details = new Details();
        details.setName(detailsRequest.getName());
        details.setCourse(courseOptional.get());
        details.setDescription(detailsRequest.getDescription());
        details.setCreated_at(new Date());
        details.setUpdated_at(new Date());
        details.setImageURL(detailsRequest.getImageURL());
        try {
            detailsRepository.save(details);
        } catch (Exception e) {
            throw new CoffeeShopException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when add details");
        }
        return messageBuilder.buildSuccessMessage(new Object[] { "Add details successfully" });
    }

    public RespMessage getDetailsByCourseId(Long courseId) {
        List<Details> details = detailsRepository.findByCourseId(courseId);

        List<DetailsDTO> result = details.stream()
                .map(DetailsDTO::new)
                .collect(Collectors.toList());

        return messageBuilder.buildSuccessMessage(result);
    }

    public RespMessage getAllDetails() {
        List<Details> details = detailsRepository.findAll();

        List<DetailsDTO> result = details.stream().map(DetailsDTO::new).collect(Collectors.toList());

        return messageBuilder.buildSuccessMessage(result);
    }

    public RespMessage getDetailsById(Long id) {
        Optional<Details> details = detailsRepository.findById(id);
        if (details.isEmpty()) {
            throw new CoffeeShopException(Constant.FIELD_NOT_FOUND, new Object[] { "details" },
                    "Details not found");
        }
        DetailsDTO detailsDTO = new DetailsDTO(details.get());
        return messageBuilder.buildSuccessMessage(detailsDTO);
    }

    public RespMessage deleteDetails(Long id) {
        try {
            Optional<Details> detailsOption = detailsRepository.findById(id);
            if (detailsOption.isEmpty()) {
                throw new CoffeeShopException(Constant.FIELD_NOT_FOUND, new Object[] { "details" },
                        "Details not found");

            } else {
                Details details = detailsOption.get();
                detailsRepository.delete(details);
                return messageBuilder.buildSuccessMessage(new Object[] { "details deleted" });
            }
        } catch (Exception e) {

            throw new CoffeeShopException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when delete details");
        }
    }
}
