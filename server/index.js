// ============================================================
// SpendWise - GraphQL Backend Entry Point
// File: server/index.js
// Description: Express server with GraphQL middleware
// ============================================================

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const app = express();

// Allow cross-origin requests from the React frontend
app.use(cors());
app.use(express.json());

// ============================================================
// IN-MEMORY DATA STORE
// We use a simple array instead of a database to keep it
// beginner-friendly. Data resets when the server restarts.
// ============================================================
let expenses = [
  {
    id: '1',
    title: 'Salary',
    amount: 50000,
    type: 'income',
    category: 'Salary',
    date: '2026-11-01'
  },
  {
    id: '2',
    title: 'Groceries',
    amount: 3500,
    type: 'expense',
    category: 'Food',
    date: '2026-11-05'
  },
  {
    id: '3',
    title: 'Netflix',
    amount: 649,
    type: 'expense',
    category: 'Entertainment',
    date: '2026-11-10'
  }
];

// ============================================================
// GRAPHQL SCHEMA
// Defines the shape of data and the available operations
// ============================================================
const schema = buildSchema(`
  # Expense type - represents a single transaction
  type Expense {
    id: String!
    title: String!
    amount: Float!
    type: String!
    category: String!
    date: String!
  }

  # Query type - read operations
  type Query {
    getExpenses: [Expense]
  }

  # Mutation type - write operations (add / delete)
  type Mutation {
    addExpense(
      title: String!
      amount: Float!
      type: String!
      category: String!
      date: String!
    ): Expense

    deleteExpense(id: String!): String
  }
`);

// ============================================================
// GRAPHQL RESOLVERS
// Functions that handle each query and mutation
// ============================================================
const root = {
  // ----- QUERY: Return all expenses -----
  getExpenses: () => {
    return expenses;
  },

  // ----- MUTATION: Add a new transaction -----
  addExpense: ({ title, amount, type, category, date }) => {
    // Generate a unique ID using timestamp
    const newExpense = {
      id: Date.now().toString(),
      title,
      amount,
      type,
      category,
      date
    };
    // Push to our in-memory array
    expenses.push(newExpense);
    return newExpense;
  },

  // ----- MUTATION: Delete a transaction by ID -----
  deleteExpense: ({ id }) => {
    const beforeLength = expenses.length;
    // Filter out the transaction with the matching ID
    expenses = expenses.filter(exp => exp.id !== id);
    if (expenses.length < beforeLength) {
      return `Transaction ${id} deleted successfully.`;
    }
    return `Transaction ${id} not found.`;
  }
};

// ============================================================
// GRAPHQL ENDPOINT
// All GraphQL operations go through POST /graphql
// GraphiQL UI is enabled for testing in the browser
// ============================================================
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Enables the GraphiQL in-browser IDE
  })
);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`\n✅ SpendWise GraphQL Server running at http://localhost:${PORT}/graphql`);
  console.log(`   Open the URL above to test queries in GraphiQL.\n`);
});
