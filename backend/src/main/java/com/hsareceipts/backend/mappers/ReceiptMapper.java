package com.hsareceipts.backend.mappers;

import com.hsareceipts.backend.domain.Receipt;
import com.hsareceipts.backend.dto.ReceiptResponse;
import org.springframework.stereotype.Component;

@Component
public class ReceiptMapper {

    public ReceiptResponse toResponse(Receipt r) {
        return new ReceiptResponse(
                r.getId(),
                r.getFilename(),
                r.getUploadedAt()
        );
    }
}
