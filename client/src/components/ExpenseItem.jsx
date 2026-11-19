// ============================================================
// ExpenseItem.jsx – Single Transaction Item (STATELESS)
// File: client/src/components/ExpenseItem.jsx
//
// This is a STATELESS (presentational) component.
// It displays a single transaction row with:
//   - Category icon
//   - Title and meta info (category + date)
//   - Amount (green for income, red for expense)
//   - Delete button with onClick handler
// ============================================================

import React from 'react';

// Map categories to emoji icons for a friendly UI
const CATEGORY_ICONS = {
  Salary: '💼',
  Food: '🍔',
  Transport: '🚌',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Health: '🏥',
  Education: '📚',
  Other: '📦'
};

// Helper: Format number as Indian Rupees
function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

// ============================================================
// ExpenseItem Component (STATELESS)
// Props:
//   transaction (object) – a single transaction object
//   onDelete    (func)   – called with transaction id on delete
// ============================================================
function ExpenseItem({ transaction, onDelete }) {
  const { id, title, amount, type, category, date } = transaction;

  // Get icon for this category, fallback to 📦
  const icon = CATEGORY_ICONS[category] || '📦';

  // Format date string for display
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className={`expense-item ${type}`}>

      {/* ---- Category Icon ---- */}
      <div className="item-icon">{icon}</div>

      {/* ---- Transaction Details ---- */}
      <div className="item-details">
        <div className="item-title">{title}</div>
        <div className="item-meta">{category} • {formattedDate}</div>
      </div>

      {/* ---- Amount (+ for income, - for expense) ---- */}
      <div className="item-amount">
        {type === 'income' ? '+' : '-'} {formatINR(amount)}
      </div>

      {/* ============================================================
          EVENT HANDLER: onClick
          Calls the onDelete prop (from App.jsx) with this item's id.
          The UI updates immediately because App.jsx filters out
          the deleted item from the state array.
          ============================================================ */}
      <button
        className="delete-btn"
        onClick={() => onDelete(id)}
        title="Delete transaction"
        aria-label={`Delete ${title}`}
      >
        🗑️
      </button>

    </div>
  );
}

export default ExpenseItem;
