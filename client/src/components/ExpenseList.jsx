// ============================================================
// ExpenseList.jsx – Transaction History Component (STATELESS)
// File: client/src/components/ExpenseList.jsx
//
// This is a STATELESS (presentational) component.
// It receives `transactions`, `loading`, and `onDelete` via props.
// It renders a list of ExpenseItem components.
// ============================================================

import React from 'react';
import ExpenseItem from './ExpenseItem';

// ============================================================
// ExpenseList Component (STATELESS)
// Props:
//   transactions (array) – list of transaction objects
//   loading      (bool)  – whether data is being fetched
//   onDelete     (func)  – called when a transaction is deleted
// ============================================================
function ExpenseList({ transactions, loading, onDelete }) {

  // ---- Show loading spinner text ----
  if (loading) {
    return (
      <div className="list-card">
        <h2 className="section-title">📋 Transaction History</h2>
        <p className="status-msg">⏳ Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="list-card">
      <h2 className="section-title">
        📋 Transaction History
        {/* Show count of transactions */}
        <span style={{ fontWeight: 400, color: '#999', marginLeft: 8, fontSize: '0.85rem' }}>
          ({transactions.length} records)
        </span>
      </h2>

      {/* ---- Empty state: no transactions ---- */}
      {transactions.length === 0 ? (
        <p className="empty-state">🧾 No transactions yet. Add one above!</p>
      ) : (
        /* ---- Render each transaction as an ExpenseItem ---- */
        transactions.map(transaction => (
          <ExpenseItem
            key={transaction.id}        // Unique key for React reconciliation
            transaction={transaction}   // Pass transaction data as prop
            onDelete={onDelete}         // Pass delete handler as prop
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;
