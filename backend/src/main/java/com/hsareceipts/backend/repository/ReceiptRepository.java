package com.hsareceipts.backend.repository;

import com.hsareceipts.backend.domain.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceiptRepository extends JpaRepository<Receipt, String> {

    List<Receipt> findByExpenseId(String expenseId);
}
