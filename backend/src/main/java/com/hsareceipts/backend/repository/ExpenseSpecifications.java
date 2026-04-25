package com.hsareceipts.backend.repository;

import com.hsareceipts.backend.domain.Expense;
import com.hsareceipts.backend.domain.ExpenseCategory;
import java.math.BigDecimal;
import org.springframework.data.jpa.domain.Specification;

public final class ExpenseSpecifications {

    private ExpenseSpecifications() {
    }

    public static Specification<Expense> ownedBy(String ownerSubject) {
        return (root, query, builder) -> builder.equal(root.<String>get("ownerSubject"), ownerSubject);
    }

    public static Specification<Expense> categoryEquals(ExpenseCategory category) {
        return (root, query, builder) -> category == null ? builder.conjunction() : builder.equal(root.<ExpenseCategory>get("expenseCategory"), category);
    }

    public static Specification<Expense> statusEquals(String status) {
        return (root, query, builder) -> status == null || status.isBlank() ? builder.conjunction() : builder.equal(builder.lower(root.<String>get("status")), status.toLowerCase());
    }

    public static Specification<Expense> dateFrom(java.time.LocalDate fromDate) {
        return (root, query, builder) -> fromDate == null ? builder.conjunction() : builder.greaterThanOrEqualTo(root.<java.time.LocalDate>get("serviceDate"), fromDate);
    }

    public static Specification<Expense> dateTo(java.time.LocalDate toDate) {
        return (root, query, builder) -> toDate == null ? builder.conjunction() : builder.lessThanOrEqualTo(root.<java.time.LocalDate>get("serviceDate"), toDate);
    }

    public static Specification<Expense> reimbursed(Boolean reimbursed) {
        return (root, query, builder) -> {
            if (reimbursed == null) {
                return builder.conjunction();
            }
            var paidAmount = root.<BigDecimal>get("paidAmount");
            var zero = BigDecimal.ZERO;
            return reimbursed
                    ? builder.and(builder.isNotNull(paidAmount), builder.greaterThan(paidAmount, zero))
                    : builder.or(builder.isNull(paidAmount), builder.equal(paidAmount, zero));
        };
    }
}
