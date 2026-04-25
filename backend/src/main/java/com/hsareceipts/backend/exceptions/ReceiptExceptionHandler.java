package com.hsareceipts.backend.exceptions;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ReceiptExceptionHandler {

    @ExceptionHandler(ReceiptStorageException.class)
    public ResponseEntity<Map<String, Object>> handleReceiptStorage(ReceiptStorageException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", "receipt_storage_failed");
        body.put("message", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(body);
    }

    @ExceptionHandler(CSVIOException.class)
    public ResponseEntity<Map<String, Object>> handleReceiptStorage(CSVIOException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", "csv_io_failed");
        body.put("message", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(body);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(EntityNotFoundException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", "not_found");
        body.put("message", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(body);
    }
}