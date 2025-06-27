# Quick Start Guide

This guide will help you get up and running with the API-driven Next.js SSR application quickly.

## 🚀 Prerequisites

1. **Node.js 18+** installed on your system
2. **API Server** running on `http://localhost:3002` with the following endpoints:
   - `GET /api/home` - Returns home page content
   - `GET /api/about` - Returns about page content

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Visit Your Application
Open [http://localhost:3003](http://localhost:3003) in your browser.

## 🔧 API Server Setup

Your API server should return responses in this format:

```json
{
  "html": "<div><h1>Page Title</h1><p>Your content here</p></div>",
  "css": ".custom-style { color: blue; font-size: 18px; }",
  "title": "Page Title for SEO",
  "description": "Page description for meta tags",
  "metadata": {
    "author": "Your Name",
    "keywords": "next.js, ssr, api"
  }
}
```

### Sample API Server (Express.js)
```javascript
const express = require('express');
const app = express();

app.get('/api/home', (req, res) => {
  res.json({
    html: '<div><h1>Welcome Home</h1><p>This content comes from the API!</p></div>',
    css: '.welcome { background: #f0f0f0; padding: 20px; }',
    title: 'Home - API Driven',
    description: 'Home page with API-driven content'
  });
});

app.get('/api/about', (req, res) => {
  res.json({
    html: '<div><h1>About Us</h1><p>Learn more about our company!</p></div>',
    css: '.about { background: #e8f4f8; padding: 20px; }',
    title: 'About Us - API Driven',
    description: 'About page with API-driven content'
  });
});

app.listen(3002, () => {
  console.log('API Server running on http://localhost:3002');
});
```

## 🎯 Adding Your First New Page

### 1. Update API Configuration
```javascript
// In lib/api-config.js
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3002',
  ENDPOINTS: {
    HOME: '/api/home',
    ABOUT: '/api/about',
    CONTACT: '/api/contact', // Add this
  },
  // ...rest of config
};
```

### 2. Add Data Fetching Function
```javascript
// In lib/data-fetching.js
export async function fetchContactData(options = {}) {
  return fetchServerData(API_CONFIG.ENDPOINTS.CONTACT, options);
}
```

### 3. Create the Page
```javascript
// Create app/contact/page.js
import { fetchContactData, generateApiMetadata } from '../../lib/data-fetching.js';
import { API_CONFIG } from '../../lib/api-config.js';
import ApiDrivenPage from '../../components/ApiDrivenPage.js';

export async function generateMetadata() {
  return generateApiMetadata(API_CONFIG.ENDPOINTS.CONTACT, {
    title: 'Contact Us',
    description: 'Get in touch with us',
  });
}

export default async function ContactPage() {
  const serverData = await fetchContactData();
  
  return (
    <ApiDrivenPage 
      serverData={serverData}
      fallbackTitle="Contact Us"
      navigationLinks={[
        { href: "/", title: "Home", description: "Back to home" },
        { href: "/about", title: "About", description: "Learn about us" }
      ]}
    />
  );
}
```

### 4. Add API Endpoint
Add `/api/contact` endpoint to your API server that returns the same JSON format.

## 🛠️ Development Tips

### Debugging API Issues
- Check if API server is running on correct port (3002)
- Verify API endpoints return correct JSON format
- Check browser console for fetch errors
- Use fallback content when API is unavailable

### Common File Locations
- **API Config:** `lib/api-config.js`
- **Data Fetching:** `lib/data-fetching.js` 
- **Generic Component:** `components/ApiDrivenPage.js`
- **Pages:** `app/[page-name]/page.js`

### Port Configuration
- **Next.js App:** Port 3003 (configurable in `package.json`)
- **API Server:** Port 3002 (configurable in `lib/api-config.js`)

## 📚 Next Steps

1. **Read the Documentation:** Check `docs/API_STRUCTURE.md` for detailed architecture
2. **View Examples:** See `examples/contact-page-example.js` for more patterns
3. **Customize Styling:** Modify `app/globals.css` and `app/page.module.css`
4. **Add More Pages:** Follow the 4-step process above

## 🆘 Need Help?

- **Architecture Questions:** Read `docs/API_STRUCTURE.md`
- **Implementation Examples:** Check `examples/` folder
- **Project Changes:** Review `CHANGELOG.md`
- **Full Documentation:** See the main `README.md`

## ✅ Verification Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] API server running on port 3002
- [ ] API endpoints return correct JSON format
- [ ] Development server starts without errors
- [ ] Pages load with API content
- [ ] Fallback content shows when API is unavailable
