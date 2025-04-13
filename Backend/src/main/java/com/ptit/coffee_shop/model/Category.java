
package com.ptit.coffee_shop.model;

import com.ptit.coffee_shop.common.enums.CategoryEnum;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private CategoryEnum name;

}