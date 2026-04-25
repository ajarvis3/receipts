package com.hsareceipts.backend.web;

import com.hsareceipts.backend.dto.ExpenseRequest;
import com.hsareceipts.backend.dto.ExpenseResponse;
import com.hsareceipts.backend.dto.ExpenseSearchRequest;
import com.hsareceipts.backend.service.ExpenseService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<ExpenseResponse> list(Authentication authentication,
                                      @RequestParam(required = false) java.time.LocalDate fromDate,
                                      @RequestParam(required = false) java.time.LocalDate toDate,
                                      @RequestParam(required = false) com.hsareceipts.backend.domain.ExpenseCategory category,
                                      @RequestParam(required = false) String status,
                                      @RequestParam(required = false) Boolean reimbursed,
                                      @RequestParam(required = false) String sortBy,
                                      @RequestParam(required = false) String sortDirection) {
        ExpenseSearchRequest searchRequest = new ExpenseSearchRequest(fromDate, toDate, category, status, reimbursed, sortBy, sortDirection);
        return expenseService.listExpenses(authentication, searchRequest).stream().map(ExpenseResponseMapper::from).toList();
    }

    @GetMapping("/{id}")
    public ExpenseResponse get(Authentication authentication, @PathVariable String id) {
        return ExpenseResponseMapper.from(expenseService.getExpense(authentication, id));
    }

    @PostMapping
    public ExpenseResponse create(Authentication authentication, @Valid @RequestBody ExpenseRequest request) {
        return ExpenseResponseMapper.from(expenseService.createExpense(authentication, request));
    }

    @PutMapping("/{id}")
    public ExpenseResponse update(Authentication authentication, @PathVariable String id, @Valid @RequestBody ExpenseRequest request) {
        return ExpenseResponseMapper.from(expenseService.updateExpense(authentication, id, request));
    }
}

