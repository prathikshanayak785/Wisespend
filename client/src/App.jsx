// ============================================================
// App.jsx – Root Component (Stateful)
// File: client/src/App.jsx
//
// This is the top-level component. It:
//  1. Holds the global state: list of transactions
//  2. Fetches transactions from the GraphQL backend on load
//  3. Passes data and handler functions down to child components
//  4. Demonstrates stateful component with useState & useEffect
// ============================================================

import React, { useState, useEffect } from 'react';
import Summary from './components/Summary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { sendGraphQL } from './graphqlClient';
import './App.css';

// ---- GraphQL Query: Fetch all transactions ----
const GET_EXPENSES_QUERY = `
  query {
    getExpenses {
      id
      title
      amount
      type
      category
      date
    }
  }
`;

// ---- GraphQL Mutation: Add a new transaction ----
const ADD_EXPENSE_MUTATION = `
  mutation AddExpense(
    $title: String!
    $amount: Float!
    $type: String!
    $category: String!
    $date: String!
  ) {
    addExpense(
      title: $title
      amount: $amount
      type: $type
      category: $category
      date: $date
    ) {
      id
      title
      amount
      type
      category
      date
    }
  }
`;

// ---- GraphQL Mutation: Delete a transaction ----
const DELETE_EXPENSE_MUTATION = `
  mutation DeleteExpense($id: String!) {
    deleteExpense(id: $id)
  }
`;

// ============================================================
// App Component (STATEFUL)
// ============================================================
function App() {
  // --- State: array of all transactions ---
  const [transactions, setTransactions] = useState([]);

  // --- State: loading indicator ---
  const [loading, setLoading] = useState(true);

  // --- State: error message ---
  const [error, setError] = useState(null);

  // ---- useEffect: Fetch transactions when the app loads ----
  useEffect(() => {
    fetchTransactions();
  }, []); // empty dependency array = run once on mount

  // ---- Handler: Fetch all transactions from GraphQL ----
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await sendGraphQL(GET_EXPENSES_QUERY);
      setTransactions(data.getExpenses); // Update state with fetched data
    } catch (err) {
      setError('Failed to load transactions. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  // ---- Handler: Add a new transaction ----
  // Called by ExpenseForm via props when the form is submitted
  const handleAddTransaction = async (formData) => {
    try {
      const data = await sendGraphQL(ADD_EXPENSE_MUTATION, formData);
      // Prepend the new transaction to the existing list (UI updates immediately)
      setTransactions(prev => [data.addExpense, ...prev]);
    } catch (err) {
      setError('Failed to add transaction.');
    }
  };

  // ---- Handler: Delete a transaction ----
  // Called by ExpenseItem via props when the delete button is clicked
  const handleDeleteTransaction = async (id) => {
    try {
      await sendGraphQL(DELETE_EXPENSE_MUTATION, { id });
      // Remove the deleted transaction from state (UI updates immediately)
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete transaction.');
    }
  };

  return (
    <div>
      {/* ---- Application Header ---- */}
      <header className="app-header">
        <h1>💰 SpendWise</h1>
        <p>Your Personal Expense Tracker</p>
      </header>

      {/* ---- Main Content Layout ---- */}
      <main className="app-container">

        {/* Left column: Summary cards + Add form */}
        <div className="summary-section">
          {/* Summary component receives transactions to calculate totals */}
          <Summary transactions={transactions} />

          {/* ExpenseForm receives the add handler as a prop */}
          <ExpenseForm onAdd={handleAddTransaction} />
        </div>

        {/* Right column: Transaction history list */}
        <div className="right-column">
          {/* ExpenseList receives transactions and delete handler as props */}
          <ExpenseList
            transactions={transactions}
            loading={loading}
            onDelete={handleDeleteTransaction}
          />
        </div>

      </main>

      {/* ---- Error display ---- */}
      {error && <p className="error-msg">{error}</p>}

      {/* ---- Footer ---- */}
      <footer className="app-footer">
        SpendWise – MCA Micro Project | Full Stack Web Development (MERN + GraphQL)
      </footer>
    </div>
  );
}

export default App;
