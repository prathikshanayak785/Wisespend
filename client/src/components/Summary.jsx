// ============================================================
// Summary.jsx – Summary Cards Component (STATELESS)
// File: client/src/components/Summary.jsx
//
// This is a STATELESS (presentational) component.
// It receives `transactions` via props, computes totals,
// and displays three summary cards:
//   - Total Income  (green)
//   - Total Expenses (red)
//   - Available Balance (blue/dark)
//
// No internal state – pure display based on props.
// ============================================================

import React from 'react';

// Helper: Format number as Indian Rupees
function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

// ============================================================
// Summary Component (STATELESS / Presentational)
// Props: transactions (array)
// ============================================================
function Summary({ transactions }) {

  // ---- Calculate totals from the transactions array ----
  const totalIncome = transactions
    .filter(t => t.type === 'income')       // Keep only income items
    .reduce((sum, t) => sum + t.amount, 0); // Add up amounts

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')      // Keep only expense items
    .reduce((sum, t) => sum + t.amount, 0); // Add up amounts

  const balance = totalIncome - totalExpenses; // Available balance

  return (
    <div className="summary-cards">
      <h2 className="section-title">📊 Overview</h2>

      {/* ---- Balance Card ---- */}
      <div className="card balance">
        <div className="card-icon">💳</div>
        <div className="card-info">
          <h3>Available Balance</h3>
          <p>{formatINR(balance)}</p>
        </div>
      </div>

      {/* ---- Total Income Card (Green) ---- */}
      <div className="card income">
        <div className="card-icon">📈</div>
        <div className="card-info">
          <h3>Total Income</h3>
          <p>{formatINR(totalIncome)}</p>
        </div>
      </div>

      {/* ---- Total Expenses Card (Red) ---- */}
      <div className="card expense">
        <div className="card-icon">📉</div>
        <div className="card-info">
          <h3>Total Expenses</h3>
          <p>{formatINR(totalExpenses)}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
