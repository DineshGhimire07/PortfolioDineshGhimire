import { useEffect } from 'react';

/**
 * SEO Component
 * Dynamically updates document title and meta tags based on the current page state.
 */
export default function SEO({ title, description, canonical }) {
  const siteName = "Dinesh Ghimire";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Update OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    // Update Twitter Title
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', fullTitle);
    }

    // Update Canonical
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag && canonical) {
      canonicalTag.setAttribute('href', canonical);
    }
  }, [fullTitle, description, canonical]);

  return null; // This component doesn't render anything to the DOM
}
