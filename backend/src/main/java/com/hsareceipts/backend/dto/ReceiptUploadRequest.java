package com.hsareceipts.backend.dto;

import org.springframework.web.multipart.MultipartFile;

public record ReceiptUploadRequest(
        String expenseId,
        MultipartFile file
) {}
