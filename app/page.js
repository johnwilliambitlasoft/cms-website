// No styles or components needed as all content comes from the API
import { fetchHomeData, generateApiMetadata } from '../lib/data-fetching.js';
import { API_CONFIG } from '../lib/api-config.js';
import ApiDrivenPage from '../components/ApiDrivenPage.js';

// This function demonstrates server-side metadata generation
export async function generateMetadata() {
  return generateApiMetadata(API_CONFIG.ENDPOINTS.HOME, {
    title: 'Home Page - Server Rendered',
    description: 'This is the home page with server-side rendering',
  });
}

// This is a Server Component by default in the App Router
export default async function Home() {
  // Server-side data fetching example - only fetch API content
  const serverData = await fetchHomeData();
  
  // Use the generic API-driven page component
  return (
    <ApiDrivenPage 
      serverData={serverData}
      fallbackTitle="Home Page"
      navigationLinks={[
        { href: "/about", title: "About Us →", description: "Learn more about our company" }
      ]}
    />
  );
}
