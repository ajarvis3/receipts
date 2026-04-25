# HSA Receipts Application
## Overview
This application will host HSA Receipts and expense information for
users. The user will be able to upload receipts either through the
UI filling in necessary information or by importing through a
csv file in the format:
"Source","Amount","Date of service","Merchant/Provider","Recipients","Status","Plan name","Expense category","Expense type","Expense sub-type","EOB number","Paid Amount","Denied Amount","Payee name","Payee account number","Payee address line 1","Payee address line 2","Payee city","Payee state","Payee zip code","Comment","Claim Number"
And individual lines like:
"Consumer","181.96","03/25/2026","Target Optical","ANDREW JARVIS","Paid","HSA","Vision","","","","181.96","0","","","","","","","","",""
"Consumer","18.76","03/28/2026","CVS","ANDREW JARVIS","Paid","HSA","Pharmacy","Drugs & Medicine","","","18.76","0","","","","","","","","",""
"Consumer","30.90","10/28/2026","OPI","ANDREW JARVIS","Unsubmitted","","Medical","","","","0","0","","","","","","","","",""
"Consumer","26.93","12/19/2021","","ANDREW JARVIS","Marked as paid","","Unknown","","","","0","0","","","","","","","","Reimbursed",""
"Disbursement","26.93","12/30/2021","Distribution","","Paid","HSA","Unknown","","","","0","0","","","","","","","","",""

Required information should include the expense amount, date,
Merchant/Provider, Recipient, and Expense Category.
The Expense Category would be Medical, Dental, Vision, or Pharmacy.
Status should be Paid or Unpaid, but should allow for values other than
that for the sake of importing older data.

Users should also be able to attach images of any necessary receipts for a given expense.
This is a concern only for the UI right now, not for a csv upload.

Users should be able to authenticate to the application using keycloak,
and they should only be able to view their own receipts.

## Structure
This should be created using docker compose.
There will be a MYSQL database, a keycloak instance, a spring boot 4
backend with Java 21, and a React Vite app for the frontend.

Any information persisted to the MYSQL should be stored in a mounted volume
so that the information can persist across restarts, as should
any information needed to allow keycloak to maintain users
and permissions across restarts.

# Backend
The backend should be a spring boot application using spring boot 4
and Java 21. If there is a spring boot dependency that can accomplish
a task, that should be added and used rather than using any other
library first.

The backend should enforce users only being able to access their own
data and return an HTTP Forbidden if a user tries to access
data that is not their own.

# Frontend
Create a React application using a vite application, typescript, and yarn.
The UI should use Material UI components.

React router should be used to send users across routes. Any route that
can show protected information should be a protected route.
If a user tries to access a protected route without authentication,
they should be redirected to login.
From the UI, users should be able to create new expenses, view expenses
they have already created, and update the expenses they already have.
Users should be able to sort expenses based on criteria such as the
date the expense occurred, and filter on a number of fields
such as category and whether the expense has already been
paid/reimbursed to the user.