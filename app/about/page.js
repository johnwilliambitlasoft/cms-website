import { fetchAboutData, generateApiMetadata } from '../../lib/data-fetching.js';
import { API_CONFIG } from '../../lib/api-config.js';
import ApiDrivenPage from '../../components/ApiDrivenPage.js';

// Generate dynamic metadata for the page
export async function generateMetadata() {
  return generateApiMetadata(API_CONFIG.ENDPOINTS.ABOUT, {
    title: 'About Us - Server Rendered',
    description: 'Learn more about our company and team',
  });
}

// Server Component - 100% rendered on the server
export default async function AboutPage() {
  // Server-side data fetching using the common utility
  const serverData = await fetchAboutData();
  
  // Use the generic API-driven page component
  return (
    <ApiDrivenPage 
      serverData={serverData}
      fallbackTitle="About Us"
    />
  );
}
