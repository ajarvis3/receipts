package com.hsareceipts.backend.exceptions;

public class ReceiptStorageException extends RuntimeException {
    public ReceiptStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
