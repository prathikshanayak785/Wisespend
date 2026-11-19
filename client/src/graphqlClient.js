// ============================================================
// graphqlClient.js – Fetch API helper for GraphQL
// File: client/src/graphqlClient.js
//
// This module provides a reusable function to send GraphQL
// queries and mutations to the backend via the Fetch API.
// All GraphQL requests are HTTP POST to /graphql endpoint.
// ============================================================

// Backend GraphQL endpoint URL
const GRAPHQL_URL = 'http://localhost:4000/graphql';

/**
 * sendGraphQL
 * -----------
 * Sends a GraphQL query or mutation to the backend.
 *
 * @param {string} query     - The GraphQL query/mutation string
 * @param {object} variables - Optional variables for the operation
 * @returns {Promise}        - Resolves with the `data` field from the response
 */
export async function sendGraphQL(query, variables = {}) {
  // Use the Fetch API to POST a JSON body
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',                          // GraphQL always uses POST
    headers: {
      'Content-Type': 'application/json',    // Send JSON in the body
    },
    body: JSON.stringify({ query, variables }) // GraphQL request format
  });

  // Parse the JSON response
  const result = await response.json();

  // GraphQL returns errors inside the JSON (not as HTTP errors)
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  // Return only the `data` portion of the GraphQL response
  return result.data;
}
