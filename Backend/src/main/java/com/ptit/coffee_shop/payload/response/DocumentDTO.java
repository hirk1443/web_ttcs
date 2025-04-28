package com.ptit.coffee_shop.payload.response;

import java.util.Date;

import com.ptit.coffee_shop.common.enums.DocumentStatusEnum;
import com.ptit.coffee_shop.model.Category;

import com.ptit.coffee_shop.model.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDTO {
    private Long id;
    private String name;
    private String description;
    private String documentLink;
    private Category category;
    private Date createdAt;
    private DocumentStatusEnum status;

    public DocumentDTO(Document d) {
        this.id = d.getId();
        this.name = d.getName();
        this.documentLink = d.getDocumentLink();
        this.description = d.getDescription();
        this.status = d.getStatus();
        this.createdAt = d.getCreated_at();
    }
}
