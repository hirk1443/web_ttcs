package com.ptit.ptit_courses.exception;

import lombok.Getter;

@Getter
public class PtitCoursesException extends RuntimeException {
    private String code;
    private Object[] objects;

    public PtitCoursesException(String code, Object[] objects, String msg) {
        super(msg);
        this.code = code;
        this.objects = objects;
    }
}
