import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ExpenseCategory, ExpenseFormValues, useExpensesApi } from '../api/client';

const emptyForm: ExpenseFormValues = {
  amount: '0.00',
  serviceDate: new Date().toISOString().slice(0, 10),
  merchantProvider: '',
  recipients: '',
  expenseCategory: 'MEDICAL',
  status: 'Unpaid',
  planName: '',
  expenseType: '',
  expenseSubType: '',
  eobNumber: '',
  paidAmount: '0.00',
  deniedAmount: '0.00',
  payeeName: '',
  payeeAccountNumber: '',
  payeeAddressLine1: '',
  payeeAddressLine2: '',
  payeeCity: '',
  payeeState: '',
  payeeZipCode: '',
  comment: '',
  claimNumber: '',
};

export function ExpenseEditorPage({ mode }: { mode: 'create' | 'edit' }) {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const api = useExpensesApi();
  const [form, setForm] = useState<ExpenseFormValues>(emptyForm);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && expenseId) {
      void api.getExpense(expenseId)
        .then((expense) => setForm({
          amount: expense.amount,
          serviceDate: expense.serviceDate,
          merchantProvider: expense.merchantProvider,
          recipients: expense.recipients,
          expenseCategory: expense.expenseCategory,
          status: expense.status,
          planName: expense.planName ?? '',
          expenseType: expense.expenseType ?? '',
          expenseSubType: expense.expenseSubType ?? '',
          eobNumber: expense.eobNumber ?? '',
          paidAmount: expense.paidAmount ?? '0.00',
          deniedAmount: expense.deniedAmount ?? '0.00',
          payeeName: expense.payeeName ?? '',
          payeeAccountNumber: expense.payeeAccountNumber ?? '',
          payeeAddressLine1: expense.payeeAddressLine1 ?? '',
          payeeAddressLine2: expense.payeeAddressLine2 ?? '',
          payeeCity: expense.payeeCity ?? '',
          payeeState: expense.payeeState ?? '',
          payeeZipCode: expense.payeeZipCode ?? '',
          comment: expense.comment ?? '',
          claimNumber: expense.claimNumber ?? '',
        } satisfies ExpenseFormValues))
        .catch((err: Error) => setError(err.message));
    }
  }, [api, expenseId, mode]);

  const submit = async () => {
    try {
      const saved = mode === 'create'
        ? await api.createExpense(form)
        : await api.updateExpense(expenseId!, form);
      navigate(`/app/expenses/${saved.id}`, { replace: true });
    } catch (submitError) {
      setError((submitError as Error).message);
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {error ? <Typography color="error">{error}</Typography> : null}
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <TextField
              label="Amount"
              value={form.amount}
              onChange={(event) => setForm((current: ExpenseFormValues) => ({ ...current, amount: event.target.value }))}
              fullWidth
            />
            <TextField
              label="Date of service"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.serviceDate}
              onChange={(event) => setForm((current: ExpenseFormValues) => ({ ...current, serviceDate: event.target.value }))}
              fullWidth
            />
          </Stack>
          <TextField
            label="Merchant / Provider"
            value={form.merchantProvider}
            onChange={(event) => setForm((current: ExpenseFormValues) => ({ ...current, merchantProvider: event.target.value }))}
          />
          <TextField
            label="Recipients"
            value={form.recipients}
            onChange={(event) => setForm((current: ExpenseFormValues) => ({ ...current, recipients: event.target.value }))}
          />
          <TextField
            select
            label="Expense Category"
            value={form.expenseCategory}
            onChange={(event) => setForm((current: ExpenseFormValues) => ({ ...current, expenseCategory: event.target.value as ExpenseCategory }))}
          >
            {(['MEDICAL', 'DENTAL', 'VISION', 'PHARMACY'] as ExpenseCategory[]).map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            value={form.status}
            onChange={(event) => setForm((current: ExpenseFormValues) => ({ ...current, status: event.target.value }))}
            helperText="Allowed values include Paid and Unpaid, but older statuses can still be imported."
          />
          <TextField
            label="Comment"
            value={form.comment}
            onChange={(event) => setForm((current: ExpenseFormValues) => ({ ...current, comment: event.target.value }))}
            multiline
            minRows={3}
          />
          <Button variant="contained" onClick={() => void submit()}>
            Save
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
