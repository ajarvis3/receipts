CREATE TABLE receipts (
    id CHAR(36) NOT NULL,
    expense_id CHAR(36) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_receipts_expense
        FOREIGN KEY (expense_id)
        REFERENCES expenses(id)
        ON DELETE CASCADE
);
