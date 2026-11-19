# 💰 SpendWise – Expense Tracker

> MCA Micro-Project | Full Stack Web Development (MERN + GraphQL)
> **Topic:** React Components, Event Handling & GraphQL API Integration

---

## Quick Start

### 1. Install Dependencies

```bash
# Install backend packages
cd server
npm install

# Install frontend packages
cd ../client
npm install
```

### 2. Run the App (open two terminals)

**Terminal 1 – Backend (port 4000)**
```bash
cd server
node index.js
```

**Terminal 2 – Frontend (port 3000)**
```bash
cd client
npm start
```

Open **http://localhost:3000** in your browser.

---

## Test GraphQL in Browser

Open **http://localhost:4000/graphql** to use the GraphiQL IDE.

**Sample Query:**
```graphql
{
  getExpenses {
    id
    title
    amount
    type
    category
    date
  }
}
```

**Sample Mutation – Add:**
```graphql
mutation {
  addExpense(
    title: "Electricity Bill"
    amount: 1200
    type: "expense"
    category: "Other"
    date: "2026-11-15"
  ) {
    id
    title
    amount
  }
}
```

**Sample Mutation – Delete:**
```graphql
mutation {
  deleteExpense(id: "1")
}
```

---

## Project Structure

```
WiseSpend/
├── server/
│   ├── index.js        ← GraphQL server (schema + resolvers)
│   └── package.json
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.js           ← React entry point
    │   ├── App.jsx            ← Root component (stateful)
    │   ├── App.css            ← All styles
    │   ├── graphqlClient.js   ← Fetch API helper
    │   └── components/
    │       ├── Summary.jsx    ← Balance/Income/Expense cards (stateless)
    │       ├── ExpenseForm.jsx← Add transaction form (stateful)
    │       ├── ExpenseList.jsx← Transaction list (stateless)
    │       └── ExpenseItem.jsx← Single transaction row (stateless)
    └── package.json
```
