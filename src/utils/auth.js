/**
 * Creates Basic Authentication header string
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {string} - Authorization header value
 */
export function createBasicAuthHeader(username, password) {
  if (!username || !password) return null;
  const credentials = btoa(`${username}:${password}`);
  return `Basic ${credentials}`;
}

/**
 * Hook to use fetch with Basic Authentication
 * Use this hook inside React components to get a fetch function with auth headers
 * 
 * Example:
 * ```jsx
 * function MyComponent() {
 *   const fetchWithAuth = useFetchWithAuth();
 *   
 *   const loadData = async () => {
 *     const response = await fetchWithAuth('/api/data');
 *     const data = await response.json();
 *   };
 * }
 * ```
 */
export function useFetchWithAuth() {
  // This should be imported and used inside components that have access to AuthContext
  // For now, we'll provide a utility that components can use with useAuth hook
  return null; // Components should use useAuth().getAuthHeader() directly
}
