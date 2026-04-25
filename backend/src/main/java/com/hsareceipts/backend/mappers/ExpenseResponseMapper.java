package com.hsareceipts.backend.mappers;

import com.hsareceipts.backend.domain.Expense;
import com.hsareceipts.backend.dto.ExpenseResponse;

public final class ExpenseResponseMapper {

    private ExpenseResponseMapper() {
    }

    public static ExpenseResponse toResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getServiceDate(),
                expense.getMerchantProvider(),
                expense.getRecipients(),
                expense.getExpenseCategory(),
                expense.getStatus(),
                expense.getPlanName(),
                expense.getExpenseType(),
                expense.getExpenseSubType(),
                expense.getEobNumber(),
                expense.getPaidAmount(),
                expense.getDeniedAmount(),
                expense.getPayeeName(),
                expense.getPayeeAccountNumber(),
                expense.getPayeeAddressLine1(),
                expense.getPayeeAddressLine2(),
                expense.getPayeeCity(),
                expense.getPayeeState(),
                expense.getPayeeZipCode(),
                expense.getComment(),
                expense.getClaimNumber(),
                expense.getCreatedAt(),
                expense.getUpdatedAt()
        );
    }
}

