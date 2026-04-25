package com.hsareceipts.backend.service;

import com.hsareceipts.backend.domain.Expense;
import com.hsareceipts.backend.domain.Receipt;
import com.hsareceipts.backend.dto.ReceiptUploadRequest;
import com.hsareceipts.backend.exceptions.ReceiptStorageException;
import com.hsareceipts.backend.repository.ExpenseRepository;
import com.hsareceipts.backend.repository.ReceiptRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final ExpenseRepository expenseRepository;
    private final ReceiptStorageService storageService;

    public ReceiptService(ReceiptRepository receiptRepository,
            ExpenseRepository expenseRepository, ReceiptStorageService storageService) {
        this.receiptRepository = receiptRepository;
        this.expenseRepository = expenseRepository;
        this.storageService = storageService;
    }

    public Receipt upload(ReceiptUploadRequest req) {
        Expense expense = expenseRepository.findById(req.expenseId())
                .orElseThrow(() -> new EntityNotFoundException("Expense not found: " + req.expenseId()));

        String storedFilename;
        try {
            storedFilename = storageService.store(req.file());
        } catch (IOException e) {
            throw new ReceiptStorageException("Failed to store receipt file", e);
        }
        Receipt r = new Receipt();
        r.setExpense(expense);
        r.setFilename(storedFilename);

        return receiptRepository.save(r);
    }

    public Receipt getById(String id) {
        return receiptRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Receipt not found: " + id));
    }

    public List<Receipt> getByExpenseId(String expenseId) {
        return receiptRepository.findByExpenseId(expenseId);
    }
}
