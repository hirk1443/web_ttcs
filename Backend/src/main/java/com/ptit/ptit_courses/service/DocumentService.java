package com.ptit.ptit_courses.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.ptit_courses.common.Constant;
import com.ptit.ptit_courses.common.enums.DocumentStatusEnum;
import com.ptit.ptit_courses.config.MessageBuilder;
import com.ptit.ptit_courses.exception.CoffeeShopException;
import com.ptit.ptit_courses.model.Category;
import com.ptit.ptit_courses.model.Document;
import com.ptit.ptit_courses.model.User;
import com.ptit.ptit_courses.payload.request.DocumentRequest;
import com.ptit.ptit_courses.payload.response.DocumentDTO;
import com.ptit.ptit_courses.payload.response.RespMessage;
import com.ptit.ptit_courses.repository.CategoryRepository;
import com.ptit.ptit_courses.repository.DocumentRepository;
import com.ptit.ptit_courses.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DocumentService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private MessageBuilder messageBuilder;

    @Autowired
    private CategoryRepository categoryRepository;

    public RespMessage getAllDocument() {
        List<Document> documents = documentRepository.findAll();

        List<DocumentDTO> result = documents.stream().map(DocumentDTO::new).collect(Collectors.toList());
        return messageBuilder.buildSuccessMessage(result);
    }

    public RespMessage getDocumentbyUserId(Long id) {

        try {
            List<Document> documents = documentRepository.findByAuthor_Id(id);

            List<DocumentDTO> result = documents.stream().map(DocumentDTO::new).collect(Collectors.toList());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);

        }

    }

    public RespMessage getDocumentByKeyword(String keyword) {
        try {
            List<Document> documents = documentRepository.findByKeyword(keyword);

            List<DocumentDTO> result = documents.stream().map(DocumentDTO::new).collect(Collectors.toList());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);

        }
    }

    public RespMessage getDocumentByStatus(DocumentStatusEnum status) {
        try {
            List<Document> documents = documentRepository.findByStatus(status);

            List<DocumentDTO> result = documents.stream().map(DocumentDTO::new).collect(Collectors.toList());
            return messageBuilder.buildSuccessMessage(result);
        } catch (Exception e) {
            return messageBuilder.buildFailureMessage(Constant.SYSTEM_ERROR, null, null);

        }
    }

    public RespMessage addDocument(DocumentRequest request) {
        try {
            Optional<User> author = userRepository.findById(request.getUserId());
            if (author.isEmpty()) {
                throw new CoffeeShopException(Constant.FIELD_NOT_FOUND, new Object[] { "details" },
                        "user not found");
            }
            Optional<Category> category = categoryRepository
                    .findById(request.getCategoryId());
            if (category.isEmpty()) {
                throw new CoffeeShopException(Constant.FIELD_NOT_FOUND, new Object[] { "details" },
                        "category not found");
            }

            Document document = new Document();
            document.setAuthor(author.get());
            document.setCategory(category.get());
            document.setName(request.getDocumentName());
            document.setDocumentLink(request.getDocumentLink());
            document.setDescription(request.getDescription());
            document.setCreated_at(new Date());
            document.setStatus(DocumentStatusEnum.PENDING);

            documentRepository.save(document);
            return messageBuilder.buildSuccessMessage(new Object[] { "Add document successfully" });

        } catch (Exception e) {
            throw new CoffeeShopException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when add document");
        }
    }

    public RespMessage changeDocumentStatus(Long documentId, DocumentStatusEnum status) {
        try {
            Optional<Document> document = documentRepository.findById(documentId);
            if (document.isEmpty()) {
                throw new CoffeeShopException(Constant.FIELD_NOT_FOUND, new Object[] { "details" },
                        "document not found");
            }
            Document newDocs = document.get();
            newDocs.setStatus(status);
            documentRepository.save(newDocs);
            return messageBuilder.buildSuccessMessage(new Object[] { "change document successfully" });

        } catch (Exception e) {
            throw new CoffeeShopException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when add document");
        }
    }

    public RespMessage deleteDocument(Long documentId) {
        try {
            Optional<Document> document = documentRepository.findById(documentId);
            if (document.isEmpty()) {
                throw new CoffeeShopException(Constant.FIELD_NOT_FOUND, new Object[] { "details" },
                        "document not found");
            }

            documentRepository.delete(document.get());
            return messageBuilder.buildSuccessMessage(new Object[] { "delete document successfully" });

        } catch (Exception e) {
            throw new CoffeeShopException(Constant.SYSTEM_ERROR, new Object[] { e.getMessage() },
                    "Error when delete document");
        }
    }
}
