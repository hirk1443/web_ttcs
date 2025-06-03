package com.ptit.ptit_courses.payload.response;

import java.util.Date;

import com.ptit.ptit_courses.model.Comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private long id;
    private Date created_at;
    private Date updated_at;
    private UserDTO author;
    private String body;

    public CommentDTO(Comment c) {
        this.id = c.getId();
        this.created_at = c.getCreated_at();
        this.updated_at = c.getUpdated_at();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(c.getAuthor().getId());
        userDTO.setName(c.getAuthor().getName());
        userDTO.setEmail(c.getAuthor().getEmail());
        userDTO.setPhone(c.getAuthor().getPhone());
        userDTO.setProfile_img(c.getAuthor().getProfile_img());
        userDTO.setStatus(c.getAuthor().getStatus().toString());
        this.author = userDTO;
        this.body = c.getBody();
    }
}
