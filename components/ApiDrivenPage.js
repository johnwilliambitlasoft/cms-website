/**
 * Generic API-driven page component
 * This component can be used for any page that gets its content from an API
 * @param {Object} serverData - The data returned from fetchServerData
 * @param {string} fallbackTitle - Fallback title if no API data
 * @param {Array} navigationLinks - Array of navigation links to display
 * @returns {JSX.Element} - The rendered page component
 */
export default function ApiDrivenPage({
  serverData,
  fallbackTitle = "Page",
}) {
  const apiData = serverData?.apiData || {};

  return (
    <>
      {/* API Content Section - Server rendered from external API */}
      {apiData && Object.keys(apiData).length > 0 ? (
        <>
          {/* Apply API CSS as inline style */}
          <style dangerouslySetInnerHTML={{ __html: apiData.css || '' }} />

          {/* Render API HTML content */}
          <div
            dangerouslySetInnerHTML={{ __html: apiData.html || `<p>No content available for ${fallbackTitle}</p>` }}
          />
        </>
      ) : (
        <div>
          <h1>{fallbackTitle}</h1>
          <p>No API content available for this page</p>
        </div>
      )}
    </>
  );
}
