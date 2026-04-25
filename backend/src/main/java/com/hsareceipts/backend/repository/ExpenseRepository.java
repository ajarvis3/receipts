package com.hsareceipts.backend.repository;

import com.hsareceipts.backend.domain.Expense;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ExpenseRepository extends JpaRepository<Expense, String>, JpaSpecificationExecutor<Expense> {
    Optional<Expense> findById(String id);
    Optional<Expense> findByIdAndOwnerSubject(String id, String ownerSubject);
    List<Expense> findAllByOwnerSubjectOrderByServiceDateDesc(String ownerSubject);
}

