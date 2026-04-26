package com.hsareceipts.backend.mappers;

import com.hsareceipts.backend.domain.ExpenseCategory;
import com.hsareceipts.backend.dto.ExpenseRequest;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class CsvToExpenseRequestMapper {

    private static final DateTimeFormatter CSV_DATE =
            DateTimeFormatter.ofPattern("MM/dd/yyyy");

    public ExpenseRequest mapCsvRecordToExpenseRequest(CSVRecord r) {
        LocalDate serviceDate = LocalDate.parse(r.get("Date of service"), CSV_DATE);

        return new ExpenseRequest(
                new BigDecimal(r.get("Amount")),
                serviceDate,
                r.get("Merchant/Provider"),
                r.get("Recipients"),
                ExpenseCategory.valueOf(r.get("Expense category").toUpperCase()),
                r.get("Status"),
                r.get("Plan name"),
                r.get("Expense type"),
                r.get("Expense sub-type"),
                r.get("EOB number"),
                parseBigDecimalOrNull(r.get("Paid Amount")),
                parseBigDecimalOrNull(r.get("Denied Amount")),
                r.get("Payee name"),
                r.get("Payee account number"),
                r.get("Payee address line 1"),
                r.get("Payee address line 2"),
                r.get("Payee city"),
                r.get("Payee state"),
                r.get("Payee zip code"),
                r.get("Comment"),
                r.get("Claim Number")
        );
    }

    private BigDecimal parseBigDecimalOrNull(String value) {
        return (value == null || value.isBlank()) ? null : new BigDecimal(value);
    }


}
