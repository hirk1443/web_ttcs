package com.ptit.coffee_shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.coffee_shop.config.MessageBuilder;
import com.ptit.coffee_shop.model.Category;
import com.ptit.coffee_shop.payload.response.RespMessage;
import com.ptit.coffee_shop.repository.CategoryRepository;

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
