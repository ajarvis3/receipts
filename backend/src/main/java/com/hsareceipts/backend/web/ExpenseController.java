package com.hsareceipts.backend.web;

import com.hsareceipts.backend.domain.Expense;
import com.hsareceipts.backend.domain.Receipt;
import com.hsareceipts.backend.dto.*;
import com.hsareceipts.backend.mappers.ExpenseResponseMapper;
import com.hsareceipts.backend.mappers.ReceiptMapper;
import com.hsareceipts.backend.service.ExpenseService;
import com.hsareceipts.backend.service.ReceiptService;
import com.hsareceipts.backend.service.ReceiptStorageService;
import jakarta.validation.Valid;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public final ReceiptStorageService receiptStorageService;

    private final ReceiptService receiptService;

    private final ReceiptMapper receiptMapper;

    public ExpenseController(ExpenseService expenseService, ReceiptService receiptService,
                             ReceiptStorageService receiptStorageService, ReceiptMapper receiptMapper) {
        this.expenseService = expenseService;
        this.receiptService = receiptService;
        this.receiptStorageService = receiptStorageService;
        this.receiptMapper = receiptMapper;
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
        return expenseService.listExpenses(authentication, searchRequest).stream().map(ExpenseResponseMapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ExpenseResponse get(Authentication authentication, @PathVariable String id) {
        return ExpenseResponseMapper.toResponse(expenseService.getExpense(authentication, id));
    }

    @GetMapping("/{expenseId}/receipts")
    public List<ReceiptResponse> listByExpense(@PathVariable String expenseId) {
        List<Receipt> receipts = receiptService.getByExpenseId(expenseId);
        return receipts.stream()
                .map(receiptMapper::toResponse)
                .toList();
    }

    @GetMapping("/receipts/{receiptId}")
    public ResponseEntity<Resource> download(@PathVariable String receiptId) {
        Receipt receipt = receiptService.getById(receiptId);
        Resource file = receiptStorageService.load(receipt.getFilename());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + receipt.getFilename() + "\"")
                .body(file);
    }

    @PostMapping
    public ExpenseResponse create(Authentication authentication, @Valid @RequestBody ExpenseRequest request) {
        return ExpenseResponseMapper.toResponse(expenseService.createExpense(authentication, request));
    }

    @PostMapping("/csv")
    public List<ExpenseResponse> create(Authentication authentication, @RequestParam("file") MultipartFile file) {
        return ExpenseResponseMapper.toResponseList(expenseService.uploadExpenses(authentication, file));
    }

    @PostMapping("/{expenseId}/receipts")
    public ReceiptResponse uploadReceipt(@PathVariable String expenseId, @RequestParam("file") MultipartFile file) {
        ReceiptUploadRequest req = new ReceiptUploadRequest(expenseId, file);
        Receipt saved = receiptService.upload(req);
        return receiptMapper.toResponse(saved);
    }

    @PutMapping("/{id}")
    public ExpenseResponse update(Authentication authentication, @PathVariable String id, @Valid @RequestBody ExpenseRequest request) {
        return ExpenseResponseMapper.toResponse(expenseService.updateExpense(authentication, id, request));
    }
}

