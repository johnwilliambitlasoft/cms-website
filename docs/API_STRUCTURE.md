# API-Driven SSR Structure

This project has been refactored to use a common, reusable approach for fetching data from APIs across all pages.

## Structure

### `/lib/api-config.js`
Contains all API configuration including:
- Base URL for the API server
- Endpoint definitions
- Default headers and fetch options
- Utility functions for building API URLs

### `/lib/data-fetching.js`
Common data fetching utilities including:
- `fetchServerData()` - Generic function for fetching from any API endpoint
- `fetchHomeData()` - Specific function for home page data
- `fetchAboutData()` - Specific function for about page data
- `generateApiMetadata()` - Generic metadata generator for API-driven pages

### `/components/ApiDrivenPage.js`
A reusable page component that:
- Handles rendering of API-provided HTML and CSS
- Provides fallback content when API data is unavailable
- Manages navigation links
- Can be used for any API-driven page

## Usage

### Adding a New Page

1. **Add the endpoint to API config:**
```javascript
// In lib/api-config.js
ENDPOINTS: {
  HOME: '/api/home',
  ABOUT: '/api/about',
  NEW_PAGE: '/api/new-page',  // Add this
}
```

2. **Create a data fetching function:**
```javascript
// In lib/data-fetching.js
export async function fetchNewPageData(options = {}) {
  return fetchServerData(API_CONFIG.ENDPOINTS.NEW_PAGE, options);
}
```

3. **Create the page component:**
```javascript
// In app/new-page/page.js
import { fetchNewPageData, generateApiMetadata } from '../../lib/data-fetching.js';
import { API_CONFIG } from '../../lib/api-config.js';
import ApiDrivenPage, { commonNavigationLinks } from '../../components/ApiDrivenPage.js';

export async function generateMetadata() {
  return generateApiMetadata(API_CONFIG.ENDPOINTS.NEW_PAGE, {
    title: 'New Page - Server Rendered',
    description: 'Description for the new page',
  });
}

export default async function NewPage() {
  const serverData = await fetchNewPageData();
  
  return (
    <ApiDrivenPage 
      serverData={serverData}
      fallbackTitle="New Page"
      navigationLinks={commonNavigationLinks.backToHome}
    />
  );
}
```

## API Response Format

The API should return responses in this format:
```json
{
  "html": "<div>Your HTML content here</div>",
  "css": ".your-styles { color: blue; }",
  "title": "Page Title",
  "description": "Page description for metadata",
  "metadata": {
    // Additional metadata fields
  }
}
```

## Benefits

1. **Consistency** - All pages use the same data fetching pattern
2. **Reusability** - Common functionality is shared across pages
3. **Maintainability** - API configuration is centralized
4. **Scalability** - Easy to add new pages and endpoints
5. **Error Handling** - Consistent error handling across all pages
6. **Fallback Content** - Graceful degradation when API is unavailable
