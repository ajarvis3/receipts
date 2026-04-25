import { Expense, ExpenseFormValues } from "../api/client";

export function mapExpenseToForm(expense: Expense): ExpenseFormValues {
   return {
      amount: expense.amount,
      serviceDate: expense.serviceDate,
      merchantProvider: expense.merchantProvider,
      recipients: expense.recipients,
      expenseCategory: expense.expenseCategory,
      status: expense.status,
      planName: expense.planName ?? "",
      expenseType: expense.expenseType ?? "",
      expenseSubType: expense.expenseSubType ?? "",
      eobNumber: expense.eobNumber ?? "",
      paidAmount: expense.paidAmount ?? "0.00",
      deniedAmount: expense.deniedAmount ?? "0.00",
      payeeName: expense.payeeName ?? "",
      payeeAccountNumber: expense.payeeAccountNumber ?? "",
      payeeAddressLine1: expense.payeeAddressLine1 ?? "",
      payeeAddressLine2: expense.payeeAddressLine2 ?? "",
      payeeCity: expense.payeeCity ?? "",
      payeeState: expense.payeeState ?? "",
      payeeZipCode: expense.payeeZipCode ?? "",
      comment: expense.comment ?? "",
      claimNumber: expense.claimNumber ?? "",
   };
}
