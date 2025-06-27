import { API_CONFIG, buildApiUrl, getDefaultFetchOptions } from './api-config.js';

/**
 * Generic server-side data fetching function
 * @param {string} endpoint - The API endpoint to fetch from (e.g., '/api/home', '/api/about')
 * @param {Object} options - Optional fetch options to override defaults
 * @returns {Promise<Object>} - The fetched data or empty object on error
 */
export async function fetchServerData(endpoint, options = {}) {
  const url = buildApiUrl(endpoint);
  const fetchOptions = {
    ...getDefaultFetchOptions(),
    ...options,
  };

  let apiData = {};

  try {
    const response = await fetch(url, fetchOptions);
    
    if (response.ok) {
      apiData = await response.json();
    } else {
      console.error(`Failed to fetch from API (${url}):`, response.status, response.statusText);
    }
  } catch (error) {
    console.error(`Error fetching API data from ${url}:`, error);
  }

  return {
    apiData: apiData,
    endpoint: endpoint,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Specific data fetching functions for each page
 */

// Home page data fetching
export async function fetchHomeData(options = {}) {
  return fetchServerData(API_CONFIG.ENDPOINTS.HOME, options);
}

// About page data fetching  
export async function fetchAboutData(options = {}) {
  return fetchServerData(API_CONFIG.ENDPOINTS.ABOUT, options);
}

/**
 * Generic metadata generator for API-driven pages
 * @param {string} endpoint - The API endpoint
 * @param {Object} fallbackMetadata - Fallback metadata if API fails
 * @returns {Promise<Object>} - Metadata object for Next.js
 */
export async function generateApiMetadata(endpoint, fallbackMetadata = {}) {
  const { apiData } = await fetchServerData(endpoint);
  const serverTime = new Date().toISOString();
  debugger
  return {
    title: apiData.title || fallbackMetadata.title || 'Server Rendered Page',
    description: apiData.description || fallbackMetadata.description || `This page was rendered on the server at ${serverTime}`,
    ...fallbackMetadata,
    // Add any additional metadata from API
    ...(apiData.metadata || {}),
  };
}
