package com.ptit.coffee_shop.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ptit.coffee_shop.config.MessageBuilder;
import com.ptit.coffee_shop.payload.response.RespMessage;

import jakarta.mail.Message;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dddvdff5d",
            "api_key", "558879132847971",
            "api_secret", "lReMVXGuCzMnFe9mPsA2hs4Ipto"));
    @Autowired
    private final MessageBuilder messageBuilder;

    public RespMessage uploadImage(MultipartFile file, String folder) {
        try {
            Map data = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", folder,
                    "resource_type", "image",
                    "quality", "auto",
                    "fetch_format", "auto"));
            return messageBuilder.buildSuccessMessage(data);
        } catch (IOException io) {
            throw new RuntimeException("Image upload failed");
        }
    }

    public RespMessage uploadDocument(MultipartFile file, String folder) {
        try {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                throw new RuntimeException("Filename is missing");
            }
            originalFilename = Paths.get(originalFilename).getFileName().toString();

            Map data = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", folder,
                    "public_id", folder + "/" + originalFilename,
                    "resource_type", "raw"));

            String originalUrl = (String) data.get("secure_url");
            String downloadUrl = originalUrl.replace("/upload/", "/upload/fl_attachment/");

            data.put("download_url", downloadUrl);

            return messageBuilder.buildSuccessMessage(data);
        } catch (IOException io) {
            throw new RuntimeException("Document upload failed");
        }
    }

    public Map delete(String imageUrl) {
        try {
            // Trích xuất public_id từ URL
            String publicId = extractPublicId(imageUrl);
            // Xóa ảnh theo public_id
            Map result = this.cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return result;
        } catch (IOException e) {
            throw new RuntimeException("Image delete fail");
        }
    }

    private String extractPublicId(String imageUrl) {
        imageUrl = imageUrl.replace("upload/", "upload/q_auto,f_auto/");
        // Lấy phần public_id từ URL (bỏ phần trước v và bỏ đuôi ảnh như .jpg, .png,
        // .gif, .jpeg)
        String[] urlParts = imageUrl.split("/v[0-9]+/");
        if (urlParts.length > 1) {
            // Loại bỏ đuôi file (ví dụ: .jpg, .png, .gif, .jpeg)
            return urlParts[1].replaceAll("\\.[a-zA-Z]{3,4}$", "");
        }
        throw new IllegalArgumentException("Invalid URL format");
    }

}