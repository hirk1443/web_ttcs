package com.ptit.ptit_courses.utils;

import lombok.Builder;

@Builder
public record MailBody(String to, String subject, String body) {
}
