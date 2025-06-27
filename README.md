# Next.js SSR App with API-Driven Content

This is a [Next.js](https://nextjs.org) project that demonstrates **Server-Side Rendering (SSR)** with **API-driven content architecture**. The application fetches all content from external APIs and renders it on the server for optimal performance and SEO.

## 🏗️ Project Architecture

This project has been refactored to use a **centralized, reusable API-driven architecture** where:
- All page content comes from external API endpoints
- Common data fetching utilities are shared across pages
- Generic components handle API content rendering
- Configuration is centralized for easy maintenance

## 📁 Project Structure

```
next-ssr-app/
├── app/                    # Next.js App Router pages
│   ├── page.js            # Home page (API-driven)
│   ├── about/
│   │   └── page.js        # About page (API-driven)
│   ├── layout.js          # Root layout
│   ├── globals.css        # Global styles
│   └── page.module.css    # Page-specific styles
├── lib/                   # Utility libraries
│   ├── api-config.js      # API configuration & endpoints
│   └── data-fetching.js   # Common data fetching utilities
├── components/            # Reusable components
│   └── ApiDrivenPage.js   # Generic API-driven page component
├── docs/                  # Documentation
│   └── API_STRUCTURE.md   # Detailed API architecture docs
├── examples/              # Usage examples
│   └── contact-page-example.js # Example of creating new pages
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- API server running on `http://localhost:3002` (configurable)

### Installation & Development

1. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Start the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. **Open your browser:**
Navigate to [http://localhost:3003](http://localhost:3003) to see the application.

### Production Build

```bash
npm run build
npm run start
```

## 🔧 Configuration

### API Configuration
Edit `lib/api-config.js` to configure your API settings:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3002',
  ENDPOINTS: {
    HOME: '/api/home',
    ABOUT: '/api/about',
  },
  // ... other configuration
};
```

### Port Configuration
The app runs on port **3003** by default. You can change this in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack -p 3003",
    "start": "next start -p 3003"
  }
}
```

## 🎯 Key Features

- **🚀 Server-Side Rendering (SSR)** - All content rendered on the server
- **🔄 API-Driven Content** - All page content fetched from external APIs
- **♻️ Reusable Architecture** - Common utilities for data fetching and rendering
- **⚡ Performance Optimized** - Uses Next.js 15 with Turbopack
- **🎨 Dynamic Styling** - CSS provided by API and applied dynamically
- **🛡️ Error Handling** - Graceful fallbacks when API is unavailable
- **📱 SEO Friendly** - Server-rendered content with dynamic metadata

## 📊 API Response Format

Your API endpoints should return responses in this format:

```json
{
  "html": "<div>Your HTML content here</div>",
  "css": ".your-styles { color: blue; }",
  "title": "Page Title",
  "description": "Page description for metadata",
  "metadata": {
    "author": "Your Name",
    "keywords": "keyword1, keyword2"
  }
}
```

## 🔧 Adding New Pages

1. **Add endpoint to API config:**
```javascript
// In lib/api-config.js
ENDPOINTS: {
  HOME: '/api/home',
  ABOUT: '/api/about',
  NEW_PAGE: '/api/new-page',  // Add this
}
```

2. **Create data fetching function:**
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
import ApiDrivenPage from '../../components/ApiDrivenPage.js';

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
      navigationLinks={[
        { href: "/", title: "Back to Home ←", description: "Return to home" }
      ]}
    />
  );
}
```

## 📖 Available Pages

- **Home** (`/`) - API-driven home page content
- **About** (`/about`) - API-driven about page content

## 🛠️ Development Tools

- **Next.js 15** - React framework with App Router
- **Turbopack** - Fast development bundler
- **ESLint** - Code linting and formatting
- **React 19** - Latest React features

## 📚 Documentation

- **[API Structure Guide](./docs/API_STRUCTURE.md)** - Detailed architecture documentation
- **[Contact Page Example](./examples/contact-page-example.js)** - Example implementation

## 🏃‍♂️ Scripts

```bash
npm run dev     # Start development server with Turbopack
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 Learn More

To learn more about Next.js and the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js) - Feedback and contributions welcome!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**John William**  
Email: rjohnWilliam9499@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
