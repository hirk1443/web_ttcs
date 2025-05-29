package com.ptit.ptit_courses.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.model.Category;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MessageBuilder messageBuilder;

    public RespMessage getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return messageBuilder.buildSuccessMessage(categories);
    }
}
