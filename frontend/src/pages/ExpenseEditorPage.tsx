import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
   Button,
   Card,
   CardContent,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   MenuItem,
   Stack,
   TextField,
   Typography,
} from "@mui/material";
import {
   ExpenseCategory,
   ExpenseFormValues,
   ReceiptMetadata,
   useExpensesApi,
} from "../api/client";
import { mapExpenseToForm } from "../utility/mappers.js";

const emptyForm: ExpenseFormValues = {
   amount: "",
   serviceDate: new Date().toISOString().slice(0, 10),
   merchantProvider: "",
   recipients: "",
   expenseCategory: "MEDICAL",
   status: "Unpaid",
   planName: "",
   expenseType: "",
   expenseSubType: "",
   eobNumber: "",
   paidAmount: "0.00",
   deniedAmount: "0.00",
   payeeName: "",
   payeeAccountNumber: "",
   payeeAddressLine1: "",
   payeeAddressLine2: "",
   payeeCity: "",
   payeeState: "",
   payeeZipCode: "",
   comment: "",
   claimNumber: "",
};

export function ExpenseEditorPage({ mode }: { mode: "create" | "edit" }) {
   const { expenseId } = useParams();
   const navigate = useNavigate();
   const api = useExpensesApi();
   const [form, setForm] = useState<ExpenseFormValues>(emptyForm);
   const [error, setError] = useState<string | null>(null);
   const [receiptFiles, setReceiptFiles] = useState<FileList | null>(null);
   const [receipts, setReceipts] = useState<ReceiptMetadata[]>([]);

   useEffect(() => {
      if (mode === "edit" && expenseId) {
         void (async () => {
            try {
               api.getExpense(expenseId).then((expense) =>
                  setForm(mapExpenseToForm(expense)),
               );

               api.listReceipts(expenseId).then((receipts) =>
                  setReceipts(receipts),
               );
            } catch (err) {
               setError((err as Error).message);
            }
         })();
      }
   }, [api, expenseId, mode]);

   const submit = async () => {
      try {
         const saved =
            mode === "create"
               ? await api.createExpense(form)
               : await api.updateExpense(expenseId!, form);

         // Upload receipts AFTER expense exists
         if (receiptFiles && receiptFiles.length > 0) {
            for (const file of Array.from(receiptFiles)) {
               await api.uploadReceipt(saved.id, file);
            }
         }

         navigate(`/app/expenses`, { replace: true });
      } catch (submitError) {
         setError((submitError as Error).message);
      }
   };

   return (
      <Card>
         <CardContent>
            <Stack spacing={2}>
               {error ? <Typography color="error">{error}</Typography> : null}
               <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
                  <TextField
                     label="Amount"
                     placeholder="0.00"
                     value={form.amount}
                     onChange={(event) =>
                        setForm((current: ExpenseFormValues) => ({
                           ...current,
                           amount: event.target.value,
                        }))
                     }
                     fullWidth
                  />
                  <TextField
                     label="Date of service"
                     type="date"
                     InputLabelProps={{ shrink: true }}
                     value={form.serviceDate}
                     onChange={(event) =>
                        setForm((current: ExpenseFormValues) => ({
                           ...current,
                           serviceDate: event.target.value,
                        }))
                     }
                     fullWidth
                  />
               </Stack>
               <TextField
                  label="Merchant / Provider"
                  placeholder="CVS"
                  value={form.merchantProvider}
                  onChange={(event) =>
                     setForm((current: ExpenseFormValues) => ({
                        ...current,
                        merchantProvider: event.target.value,
                     }))
                  }
               />
               <TextField
                  label="Recipients"
                  placeholder="Jane Don't"
                  value={form.recipients}
                  onChange={(event) =>
                     setForm((current: ExpenseFormValues) => ({
                        ...current,
                        recipients: event.target.value,
                     }))
                  }
               />
               <TextField
                  select
                  label="Expense Category"
                  value={form.expenseCategory}
                  onChange={(event) =>
                     setForm((current: ExpenseFormValues) => ({
                        ...current,
                        expenseCategory: event.target.value as ExpenseCategory,
                     }))
                  }
               >
                  {(
                     [
                        "MEDICAL",
                        "DENTAL",
                        "VISION",
                        "PHARMACY",
                     ] as ExpenseCategory[]
                  ).map((category) => (
                     <MenuItem key={category} value={category}>
                        {category}
                     </MenuItem>
                  ))}
               </TextField>
               <TextField
                  label="Status"
                  value={form.status}
                  onChange={(event) =>
                     setForm((current: ExpenseFormValues) => ({
                        ...current,
                        status: event.target.value,
                     }))
                  }
                  helperText="Allowed values include Paid and Unpaid, but older statuses can still be imported."
               />
               <TextField
                  label="Comment"
                  value={form.comment}
                  onChange={(event) =>
                     setForm((current: ExpenseFormValues) => ({
                        ...current,
                        comment: event.target.value,
                     }))
                  }
                  multiline
                  minRows={3}
               />
               <Stack spacing={1}>
                  <Typography variant="subtitle1">Receipts</Typography>

                  <List dense>
                     {receipts.map((r) => (
                        <ListItem key={r.id} disablePadding>
                           <ListItemButton
                              component="a"
                              onClick={() => api.getReceipt(r.id)}
                              target="_blank"
                           >
                              <ListItemText primary={r.filename} />
                           </ListItemButton>
                        </ListItem>
                     ))}
                  </List>

                  <Button variant="contained" component="label" color="primary">
                     Upload Receipts
                     <input
                        type="file"
                        hidden
                        multiple
                        onChange={(e) => setReceiptFiles(e.target.files)}
                     />
                  </Button>

                  {receiptFiles && (
                     <Stack spacing={0.5} sx={{ mt: 1 }}>
                        {Array.from(receiptFiles).map((file) => (
                           <Typography key={file.name} variant="body2">
                              {file.name}
                           </Typography>
                        ))}
                     </Stack>
                  )}
               </Stack>
               <Button variant="contained" onClick={() => void submit()}>
                  Save
               </Button>
            </Stack>
         </CardContent>
      </Card>
   );
}
