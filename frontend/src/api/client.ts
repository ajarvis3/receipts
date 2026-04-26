import { useMemo } from "react";
import { useAuth } from "../auth/AuthContext";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api";

export type ExpenseCategory = "MEDICAL" | "DENTAL" | "VISION" | "PHARMACY";

export type Expense = {
   id: string;
   amount: string;
   serviceDate: string;
   merchantProvider: string;
   recipients: string;
   expenseCategory: ExpenseCategory;
   status: string;
   planName?: string | null;
   expenseType?: string | null;
   expenseSubType?: string | null;
   eobNumber?: string | null;
   paidAmount?: string | null;
   deniedAmount?: string | null;
   payeeName?: string | null;
   payeeAccountNumber?: string | null;
   payeeAddressLine1?: string | null;
   payeeAddressLine2?: string | null;
   payeeCity?: string | null;
   payeeState?: string | null;
   payeeZipCode?: string | null;
   comment?: string | null;
   claimNumber?: string | null;
};

export type ExpenseFormValues = Omit<Expense, "id">;

export type ReceiptMetadata = {
   id: string;
   filename: string;
};

async function request<T>(
   path: string,
   token: string | null,
   init?: RequestInit,
): Promise<T> {
   const isFormData = init?.body instanceof FormData;

   const response = await fetch(
      `${apiBaseUrl}${path.startsWith("/api") ? path.slice(4) : path}`,
      {
         ...init,
         headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(init?.headers ?? {}),
         },
      },
   );

   if (!response.ok) {
      const message = await response.text();
      throw new Error(
         message || `Request failed with status ${response.status}`,
      );
   }

   return response.json() as Promise<T>;
}

// For receipt return for now.
async function requestBlob(
   path: string,
   token: string | null,
   init?: RequestInit,
): Promise<Blob> {
   const isFormData = init?.body instanceof FormData;

   const response = await fetch(
      `${apiBaseUrl}${path.startsWith("/api") ? path.slice(4) : path}`,
      {
         ...init,
         headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(init?.headers ?? {}),
         },
      },
   );

   if (!response.ok) {
      const message = await response.text();
      throw new Error(
         message || `Request failed with status ${response.status}`,
      );
   }

   return response.blob();
}

export function useExpensesApi() {
   const { token } = useAuth();

   return useMemo(
      () => ({
         listExpenses: (
            query: Record<string, string | boolean | undefined>,
         ) => {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(query)) {
               if (value !== undefined && value !== "") {
                  params.set(key, String(value));
               }
            }
            const suffix = params.toString() ? `?${params.toString()}` : "";
            return request<Expense[]>(`/api/expenses${suffix}`, token);
         },
         getExpense: (id: string) =>
            request<Expense>(`/api/expenses/${id}`, token),
         createExpense: (payload: ExpenseFormValues) =>
            request<Expense>("/api/expenses", token, {
               method: "POST",
               body: JSON.stringify(payload),
            }),
         uploadCsv: (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            return request(`/api/expenses/csv`, token, {
               method: "POST",
               body: formData,
            });
         },
         updateExpense: (id: string, payload: ExpenseFormValues) =>
            request<Expense>(`/api/expenses/${id}`, token, {
               method: "PUT",
               body: JSON.stringify(payload),
            }),
         uploadReceipt: (expenseId: string, file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            return request(`/api/expenses/${expenseId}/receipts`, token, {
               method: "POST",
               body: formData,
            });
         },
         listReceipts: (expenseId: string) =>
            request<ReceiptMetadata[]>(
               `/api/expenses/${expenseId}/receipts`,
               token,
            ),
         getReceipt: async (receiptId: string) => {
            const blob = await requestBlob(
               `/api/expenses/receipts/${receiptId}`,
               token,
            );

            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
         },
      }),
      [token],
   );
}
