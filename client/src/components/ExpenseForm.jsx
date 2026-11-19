// ============================================================
// ExpenseForm.jsx – Add Transaction Form (STATEFUL)
// File: client/src/components/ExpenseForm.jsx
//
// This is a STATEFUL component.
// It manages the form field values in its local state.
// When submitted, it calls the onAdd prop (from App.jsx)
// with the form data.
//
// Event Handlers demonstrated:
//   - onChange : updates state when user types or selects
//   - onSubmit : sends the transaction to the backend
//   - onClick  : toggles between Income / Expense type
// ============================================================

import React, { useState } from 'react';

// Available categories for the dropdown
const CATEGORIES = ['Salary', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'];

// ============================================================
// ExpenseForm Component (STATEFUL)
// Props: onAdd (function – called when form is submitted)
// ============================================================
function ExpenseForm({ onAdd }) {

  // ---- Local form state ----
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',    // default to 'expense'
    category: 'Food',
    date: new Date().toISOString().split('T')[0] // today's date
  });

  // ---- Error message for validation ----
  const [formError, setFormError] = useState('');

  // ---- Loading state while submitting ----
  const [submitting, setSubmitting] = useState(false);

  // ============================================================
  // EVENT HANDLER: onChange
  // Runs whenever the user types in an input or selects an option.
  // Uses computed property name [e.target.name] to update the
  // correct field in state.
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ============================================================
  // EVENT HANDLER: onClick (Type Toggle)
  // Toggles the transaction type between 'income' and 'expense'
  // ============================================================
  const handleTypeToggle = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  // ============================================================
  // EVENT HANDLER: onSubmit
  // Validates inputs and calls the onAdd prop to add transaction.
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload (default form behaviour)
    setFormError('');

    // --- Validation ---
    if (!formData.title.trim()) {
      setFormError('Please enter a title.');
      return;
    }
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      setFormError('Please enter a valid positive amount.');
      return;
    }

    setSubmitting(true);
    try {
      // Call the onAdd handler passed from App.jsx (props)
      await onAdd({
        title: formData.title.trim(),
        amount: parseFloat(formData.amount), // Convert string to number
        type: formData.type,
        category: formData.category,
        date: formData.date
      });

      // Reset form after successful submission
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      setFormError('Could not add transaction. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2 className="section-title">➕ Add Transaction</h2>

      {/* ---- Form with onSubmit handler ---- */}
      <form onSubmit={handleSubmit}>

        {/* -- Type Toggle Buttons (onClick) -- */}
        <div className="form-group">
          <label>Type</label>
          <div className="type-toggle">
            {/* onClick toggles the type in state */}
            <button
              type="button"
              className={`type-btn income ${formData.type === 'income' ? 'active' : ''}`}
              onClick={() => handleTypeToggle('income')}
            >
              ▲ Income
            </button>
            <button
              type="button"
              className={`type-btn expense ${formData.type === 'expense' ? 'active' : ''}`}
              onClick={() => handleTypeToggle('expense')}
            >
              ▼ Expense
            </button>
          </div>
        </div>

        {/* -- Title Input (onChange) -- */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="e.g. Monthly Salary, Lunch"
            value={formData.title}
            onChange={handleChange}   // onChange updates state on every keystroke
          />
        </div>

        {/* -- Amount Input (onChange) -- */}
        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="e.g. 5000"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}   // onChange updates state on every keystroke
          />
        </div>

        {/* -- Category Select (onChange) -- */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}   // onChange updates state on selection change
          >
            {/* Map over the CATEGORIES array to render <option> elements */}
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* -- Date Input (onChange) -- */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}   // onChange updates state on date change
          />
        </div>

        {/* -- Validation Error -- */}
        {formError && <p className="error-msg">{formError}</p>}

        {/* -- Submit Button (triggers onSubmit on the form) -- */}
        <button
          type="submit"
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? 'Adding...' : '+ Add Transaction'}
        </button>

      </form>
    </div>
  );
}

export default ExpenseForm;
