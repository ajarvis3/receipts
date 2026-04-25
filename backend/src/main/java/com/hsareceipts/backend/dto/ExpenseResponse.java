package com.hsareceipts.backend.dto;

import com.hsareceipts.backend.domain.ExpenseCategory;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public record ExpenseResponse(
        String id,
        BigDecimal amount,
        LocalDate serviceDate,
        String merchantProvider,
        String recipients,
        ExpenseCategory expenseCategory,
        String status,
        String planName,
        String expenseType,
        String expenseSubType,
        String eobNumber,
        BigDecimal paidAmount,
        BigDecimal deniedAmount,
        String payeeName,
        String payeeAccountNumber,
        String payeeAddressLine1,
        String payeeAddressLine2,
        String payeeCity,
        String payeeState,
        String payeeZipCode,
        String comment,
        String claimNumber,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}

