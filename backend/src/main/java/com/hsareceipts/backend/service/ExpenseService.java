package com.hsareceipts.backend.service;

import com.hsareceipts.backend.domain.Expense;
import com.hsareceipts.backend.dto.ExpenseRequest;
import com.hsareceipts.backend.dto.ExpenseSearchRequest;
import com.hsareceipts.backend.repository.ExpenseRepository;
import com.hsareceipts.backend.repository.ExpenseSpecifications;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> listExpenses(Authentication authentication, ExpenseSearchRequest searchRequest) {
        String ownerSubject = subject(authentication);
        var specification = ExpenseSpecifications.ownedBy(ownerSubject)
                .and(ExpenseSpecifications.categoryEquals(searchRequest.category()))
                .and(ExpenseSpecifications.statusEquals(searchRequest.status()))
                .and(ExpenseSpecifications.dateFrom(searchRequest.fromDate()))
                .and(ExpenseSpecifications.dateTo(searchRequest.toDate()))
                .and(ExpenseSpecifications.reimbursed(searchRequest.reimbursed()));

        Sort sort = sort(searchRequest.sortBy(), searchRequest.sortDirection());
        return expenseRepository.findAll(specification, sort);
    }

    public Expense getExpense(Authentication authentication, String id) {
        return expenseRepository.findById(id)
                .map(expense -> requireOwnership(authentication, expense))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));
    }

    public Expense createExpense(Authentication authentication, ExpenseRequest request) {
        Expense expense = new Expense();
        expense.setOwnerSubject(subject(authentication));
        apply(expense, request);
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Authentication authentication, String id, ExpenseRequest request) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));
        requireOwnership(authentication, expense);
        apply(expense, request);
        return expenseRepository.save(expense);
    }

    private Expense requireOwnership(Authentication authentication, Expense expense) {
        if (!subject(authentication).equals(expense.getOwnerSubject())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only access your own expenses");
        }
        return expense;
    }

    private void apply(Expense expense, ExpenseRequest request) {
        expense.setAmount(request.amount());
        expense.setServiceDate(request.serviceDate());
        expense.setMerchantProvider(request.merchantProvider());
        expense.setRecipients(request.recipients());
        expense.setExpenseCategory(request.expenseCategory());
        expense.setStatus(request.status());
        expense.setPlanName(request.planName());
        expense.setExpenseType(request.expenseType());
        expense.setExpenseSubType(request.expenseSubType());
        expense.setEobNumber(request.eobNumber());
        expense.setPaidAmount(request.paidAmount());
        expense.setDeniedAmount(request.deniedAmount());
        expense.setPayeeName(request.payeeName());
        expense.setPayeeAccountNumber(request.payeeAccountNumber());
        expense.setPayeeAddressLine1(request.payeeAddressLine1());
        expense.setPayeeAddressLine2(request.payeeAddressLine2());
        expense.setPayeeCity(request.payeeCity());
        expense.setPayeeState(request.payeeState());
        expense.setPayeeZipCode(request.payeeZipCode());
        expense.setComment(request.comment());
        expense.setClaimNumber(request.claimNumber());
    }

    private String subject(Authentication authentication) {
        return authentication.getName();
    }

    private Sort sort(String sortBy, String sortDirection) {
        String resolvedSortBy = (sortBy == null || sortBy.isBlank()) ? "serviceDate" : sortBy;
        Sort.Direction direction = "asc".equalsIgnoreCase(sortDirection) ? Sort.Direction.ASC : Sort.Direction.DESC;
        return Sort.by(direction, resolvedSortBy);
    }
}

