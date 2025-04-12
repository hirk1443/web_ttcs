
package com.ptit.coffee_shop.model;

import java.util.List;

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

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "teacher")
    private String teacher;

    @OneToMany
    @JoinColumn(name = "details_id")
    private List<Details> details;
}