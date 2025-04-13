
package com.ptit.coffee_shop.model;

import java.util.List;

import org.hibernate.mapping.Join;

import com.ptit.coffee_shop.common.enums.CategoryEnum;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String imageURL;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "teacher")
    private String teacher;

    @OneToMany
    @JoinColumn(name = "details_id")
    private List<Details> details;
}