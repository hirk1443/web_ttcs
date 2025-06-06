package com.ptit.ptit_courses.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    @JsonProperty("Name")
    private String name;

    @JsonProperty("Phone")
    private String phone;

    @JsonProperty("ProfileImg")
    private String profileImg;

    @JsonProperty("Password")
    private String password;

    @JsonProperty("ConfirmPassword")
    private String confirmPassword;
}
