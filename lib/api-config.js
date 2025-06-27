// API Configuration for the application
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3002',
  ENDPOINTS: {
    HOME: '/api/home',
    ABOUT: '/api/about',
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  TIMEOUT: 10000, // 10 seconds
};

// API endpoint builder utility
export function buildApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}

// Common fetch options
export function getDefaultFetchOptions() {
  return {
    headers: API_CONFIG.DEFAULT_HEADERS,
    // You can add more default options here like timeout, cache settings, etc.
  };
}
