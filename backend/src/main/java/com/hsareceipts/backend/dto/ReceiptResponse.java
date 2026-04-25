package com.hsareceipts.backend.dto;

import java.time.OffsetDateTime;

public record ReceiptResponse(
        String id,
        String filename,
        OffsetDateTime uploadedAt
) {}
