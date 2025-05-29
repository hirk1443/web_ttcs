package com.ptit.ptit_courses.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.common.GsonUtil;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.PtitCoursesException;
import com.ptit.ptit_courses.payload.request.LoginRequest;
import com.ptit.ptit_courses.payload.request.RegisterRequest;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.service.AuthService;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    public final AuthService authService;
    public final MessageBuilder messageBuilder;

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            RespMessage response = authService.login(loginRequest);
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(response), HttpStatus.OK);
        } catch (PtitCoursesException e) {
            RespMessage resp = messageBuilder.buildFailureMessage(e.getCode(), e.getObjects(), e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(resp), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            RespMessage resp = messageBuilder.buildFailureMessage(Constant.UNDEFINED, null, e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(resp), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        try {
            RespMessage response = authService.register(registerRequest);
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(response), HttpStatus.OK);
        } catch (PtitCoursesException e) {
            RespMessage response = messageBuilder.buildFailureMessage(e.getCode(), e.getObjects(), e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(response), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            RespMessage response = messageBuilder.buildFailureMessage(Constant.UNDEFINED, null, e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(response), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/user-details", method = RequestMethod.GET)
    public ResponseEntity<String> getAccount() {
        try {
            RespMessage response = authService.getProfileByToken();
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(response), HttpStatus.OK);
        } catch (PtitCoursesException e) {
            RespMessage response = messageBuilder.buildFailureMessage(e.getCode(), e.getObjects(), e.getMessage());
            return new ResponseEntity<>(GsonUtil.getInstance().toJson(response), HttpStatus.BAD_REQUEST);
        }
    }

    // @RequestMapping(value = "/password", method = RequestMethod.POST)
    // @PreAuthorize("hasRole('ROLE_USER')")
    // public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO
    // changePasswordDTO) {
    // try {
    // RespMessage response = authService.changePassword(changePasswordDTO);
    // return new ResponseEntity<>(GsonUtil.getInstance().toJson(response),
    // HttpStatus.OK);
    // } catch (CoffeeShopException e) {
    // RespMessage response = messageBuilder.buildFailureMessage(e.getCode(),
    // e.getObjects(), e.getMessage());
    // return new ResponseEntity<>(GsonUtil.getInstance().toJson(response),
    // HttpStatus.BAD_REQUEST);
    // }
    // catch (Exception e) {
    // RespMessage response = messageBuilder.buildFailureMessage(Constant.UNDEFINED,
    // null, e.getMessage());
    // return new ResponseEntity<>(GsonUtil.getInstance().toJson(response),
    // HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    // @PostMapping("/refresh-token")
    // public ResponseEntity<RespMessage>
    // refreshAccessToken(@RequestHeader("Authorization") String refreshToken) {
    // RespMessage response = authService.refreshAccessToken(refreshToken);
    // return new ResponseEntity<>(response, HttpStatus.OK);
    // }

}