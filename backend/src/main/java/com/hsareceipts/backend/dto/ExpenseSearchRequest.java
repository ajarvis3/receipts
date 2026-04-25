package com.hsareceipts.backend.dto;

import com.hsareceipts.backend.domain.ExpenseCategory;
import java.time.LocalDate;

public record ExpenseSearchRequest(
        LocalDate fromDate,
        LocalDate toDate,
        ExpenseCategory category,
        String status,
        Boolean reimbursed,
        String sortBy,
        String sortDirection
) {
}

