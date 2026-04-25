package com.hsareceipts.backend.domain;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @Column(length = 36, nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "owner_subject", nullable = false, length = 128)
    private String ownerSubject;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "service_date", nullable = false)
    private LocalDate serviceDate;

    @Column(name = "merchant_provider", nullable = false)
    private String merchantProvider;

    @Column(nullable = false)
    private String recipients;

    @Enumerated(EnumType.STRING)
    @Column(name = "expense_category", nullable = false, length = 32)
    private ExpenseCategory expenseCategory;

    @Column(nullable = false, length = 64)
    private String status;

    @Column(name = "plan_name")
    private String planName;

    @Column(name = "expense_type")
    private String expenseType;

    @Column(name = "expense_sub_type")
    private String expenseSubType;

    @Column(name = "eob_number")
    private String eobNumber;

    @Column(name = "paid_amount", precision = 12, scale = 2)
    private BigDecimal paidAmount;

    @Column(name = "denied_amount", precision = 12, scale = 2)
    private BigDecimal deniedAmount;

    @Column(name = "payee_name")
    private String payeeName;

    @Column(name = "payee_account_number")
    private String payeeAccountNumber;

    @Column(name = "payee_address_line_1")
    private String payeeAddressLine1;

    @Column(name = "payee_address_line_2")
    private String payeeAddressLine2;

    @Column(name = "payee_city")
    private String payeeCity;

    @Column(name = "payee_state")
    private String payeeState;

    @Column(name = "payee_zip_code")
    private String payeeZipCode;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(name = "claim_number")
    private String claimNumber;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Receipt> receipts;

    public Expense() {
        receipts = new ArrayList<Receipt>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwnerSubject() {
        return ownerSubject;
    }

    public void setOwnerSubject(String ownerSubject) {
        this.ownerSubject = ownerSubject;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
    }

    public String getMerchantProvider() {
        return merchantProvider;
    }

    public void setMerchantProvider(String merchantProvider) {
        this.merchantProvider = merchantProvider;
    }

    public String getRecipients() {
        return recipients;
    }

    public void setRecipients(String recipients) {
        this.recipients = recipients;
    }

    public ExpenseCategory getExpenseCategory() {
        return expenseCategory;
    }

    public void setExpenseCategory(ExpenseCategory expenseCategory) {
        this.expenseCategory = expenseCategory;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getExpenseType() {
        return expenseType;
    }

    public void setExpenseType(String expenseType) {
        this.expenseType = expenseType;
    }

    public String getExpenseSubType() {
        return expenseSubType;
    }

    public void setExpenseSubType(String expenseSubType) {
        this.expenseSubType = expenseSubType;
    }

    public String getEobNumber() {
        return eobNumber;
    }

    public void setEobNumber(String eobNumber) {
        this.eobNumber = eobNumber;
    }

    public BigDecimal getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(BigDecimal paidAmount) {
        this.paidAmount = paidAmount;
    }

    public BigDecimal getDeniedAmount() {
        return deniedAmount;
    }

    public void setDeniedAmount(BigDecimal deniedAmount) {
        this.deniedAmount = deniedAmount;
    }

    public String getPayeeName() {
        return payeeName;
    }

    public void setPayeeName(String payeeName) {
        this.payeeName = payeeName;
    }

    public String getPayeeAccountNumber() {
        return payeeAccountNumber;
    }

    public void setPayeeAccountNumber(String payeeAccountNumber) {
        this.payeeAccountNumber = payeeAccountNumber;
    }

    public String getPayeeAddressLine1() {
        return payeeAddressLine1;
    }

    public void setPayeeAddressLine1(String payeeAddressLine1) {
        this.payeeAddressLine1 = payeeAddressLine1;
    }

    public String getPayeeAddressLine2() {
        return payeeAddressLine2;
    }

    public void setPayeeAddressLine2(String payeeAddressLine2) {
        this.payeeAddressLine2 = payeeAddressLine2;
    }

    public String getPayeeCity() {
        return payeeCity;
    }

    public void setPayeeCity(String payeeCity) {
        this.payeeCity = payeeCity;
    }

    public String getPayeeState() {
        return payeeState;
    }

    public void setPayeeState(String payeeState) {
        this.payeeState = payeeState;
    }

    public String getPayeeZipCode() {
        return payeeZipCode;
    }

    public void setPayeeZipCode(String payeeZipCode) {
        this.payeeZipCode = payeeZipCode;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getClaimNumber() {
        return claimNumber;
    }

    public void setClaimNumber(String claimNumber) {
        this.claimNumber = claimNumber;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Receipt> getReceipts() {
        return receipts;
    }

    public void setReceipts(List<Receipt> receipts) {
        this.receipts = receipts;
    }
}

