
package com.ptit.coffee_shop.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "content")

public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long contentId;

    @Column(name = "title")
    private String title;

    @Column(name = "document_link")
    private String documentLink;

    @Column(name = "video_link")
    private String videoLink;

    @Column(name = "created_at")
    private Date created_at;

    @Column(name = "updated_at")
    private Date updated_at;

    @ManyToMany(mappedBy = "comment")
    private List<Comment> comments;

}
