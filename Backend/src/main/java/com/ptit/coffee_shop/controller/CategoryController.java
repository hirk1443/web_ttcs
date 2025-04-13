package com.ptit.coffee_shop.controller;

import com.ptit.coffee_shop.common.Constant;
import com.ptit.coffee_shop.common.GsonUtil;
import com.ptit.coffee_shop.config.MessageBuilder;
import com.ptit.coffee_shop.exception.CoffeeShopException;

import com.ptit.coffee_shop.payload.response.RespMessage;
import com.ptit.coffee_shop.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private MessageBuilder messageBuilder;

    @GetMapping("/all")
    public ResponseEntity<String> getAllCourses() {
        try {
            RespMessage respMessage = categoryService.getAllCategories();
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(respMessage),
                    HttpStatus.OK);
        } catch (CoffeeShopException e) {
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
