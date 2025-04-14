package com.ptit.coffee_shop.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.coffee_shop.common.Constant;
import com.ptit.coffee_shop.config.MessageBuilder;
import com.ptit.coffee_shop.exception.CoffeeShopException;
import com.ptit.coffee_shop.model.Course;
import com.ptit.coffee_shop.model.Details;
import com.ptit.coffee_shop.payload.request.DetailsRequest;
import com.ptit.coffee_shop.payload.response.DetailsDTO;
import com.ptit.coffee_shop.payload.response.RespMessage;
import com.ptit.coffee_shop.repository.CourseRepository;
import com.ptit.coffee_shop.repository.DetailsRepository;

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

}
