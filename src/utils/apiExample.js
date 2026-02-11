/**
 * Example: How to use Basic Authentication in API calls
 * 
 * This file demonstrates how to use the AuthContext to add Basic Auth headers
 * to your API requests.
 */

import { useAuth } from '../context/AuthContext';

/**
 * Example 1: Using fetch with Basic Auth headers
 */
export function ExampleFetchWithAuth() {
  const { getAuthHeader } = useAuth();

  const fetchData = async () => {
    const authHeader = getAuthHeader();
    
    if (!authHeader) {
      console.error('Not authenticated');
      return;
    }

    try {
      const response = await fetch('/api/your-endpoint', {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { fetchData };
}

/**
 * Example 2: Creating a reusable API client function
 */
export function useApiClient() {
  const { getAuthHeader } = useAuth();

  const apiCall = async (url, options = {}) => {
    const authHeader = getAuthHeader();
    
    if (!authHeader) {
      throw new Error('Not authenticated');
    }

    const headers = {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return { apiCall };
}
