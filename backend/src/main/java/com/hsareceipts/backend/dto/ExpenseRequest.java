package com.hsareceipts.backend.dto;

import com.hsareceipts.backend.domain.ExpenseCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(
        @NotNull BigDecimal amount,
        @NotNull LocalDate serviceDate,
        @NotBlank String merchantProvider,
        @NotBlank String recipients,
        @NotNull ExpenseCategory expenseCategory,
        @NotBlank String status,
        String planName,
        String expenseType,
        String expenseSubType,
        String eobNumber,
        @PositiveOrZero BigDecimal paidAmount,
        @PositiveOrZero BigDecimal deniedAmount,
        String payeeName,
        String payeeAccountNumber,
        String payeeAddressLine1,
        String payeeAddressLine2,
        String payeeCity,
        String payeeState,
        String payeeZipCode,
        String comment,
        String claimNumber
) {
}

