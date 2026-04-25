import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Expense, ExpenseCategory, useExpensesApi } from '../api/client';

type Filters = {
  fromDate: string;
  toDate: string;
  category: string;
  status: string;
  reimbursed: boolean;
  sortBy: string;
  sortDirection: string;
};

const defaultFilters: Filters = {
  fromDate: '',
  toDate: '',
  category: '',
  status: '',
  reimbursed: false,
  sortBy: 'serviceDate',
  sortDirection: 'desc',
};

export function ExpensesPage() {
  const api = useExpensesApi();
  const [filters, setFilters] = useState(defaultFilters);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => ({
    fromDate: filters.fromDate || undefined,
    toDate: filters.toDate || undefined,
    category: filters.category || undefined,
    status: filters.status || undefined,
    reimbursed: filters.reimbursed || undefined,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
  }), [filters]);

  useEffect(() => {
    void api.listExpenses(query)
      .then(setExpenses)
      .catch((err: Error) => setError(err.message));
  }, [api, query]);

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} useFlexGap flexWrap="wrap">
            <TextField
              label="From"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={filters.fromDate}
              onChange={(event) => setFilters((current) => ({ ...current, fromDate: event.target.value }))}
            />
            <TextField
              label="To"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={filters.toDate}
              onChange={(event) => setFilters((current) => ({ ...current, toDate: event.target.value }))}
            />
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={filters.category}
                onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
              >
                <MenuItem value="">All</MenuItem>
                {(['MEDICAL', 'DENTAL', 'VISION', 'PHARMACY'] as ExpenseCategory[]).map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Status"
              value={filters.status}
              onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
            />
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                label="Sort by"
                value={filters.sortBy}
                onChange={(event) => setFilters((current) => ({ ...current, sortBy: event.target.value }))}
              >
                <MenuItem value="serviceDate">Service date</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
                <MenuItem value="merchantProvider">Merchant</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Direction</InputLabel>
              <Select
                label="Direction"
                value={filters.sortDirection}
                onChange={(event) => setFilters((current) => ({ ...current, sortDirection: event.target.value }))}
              >
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" alignItems="center">
              <Checkbox
                checked={filters.reimbursed}
                onChange={(event) => setFilters((current) => ({ ...current, reimbursed: event.target.checked }))}
              />
              <Typography>Reimbursed only</Typography>
            </Stack>
            <Button component={Link} to="/app/expenses/new" variant="contained">
              New Expense
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {error ? (
        <Card>
          <CardContent>
            <Typography color="error">{error}</Typography>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardContent>
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Merchant</TableCell>
                  <TableCell>Recipient</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id} hover>
                    <TableCell>{expense.serviceDate}</TableCell>
                    <TableCell>{expense.merchantProvider}</TableCell>
                    <TableCell>{expense.recipients}</TableCell>
                    <TableCell>{expense.expenseCategory}</TableCell>
                    <TableCell>{expense.status}</TableCell>
                    <TableCell align="right">${Number(expense.amount).toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <Button component={Link} to={`/app/expenses/${expense.id}`} size="small">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {expenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Typography color="text.secondary">No expenses found.</Typography>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
