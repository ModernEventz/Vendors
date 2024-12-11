import { getServerSideSitemap } from 'next-sitemap';

export default async function handler(req, res) {
  // Fetch dynamic data (replace with your own data source)
  const pages = await fetchYourData(); // Example function to get your dynamic pages
  
  // Base URL of your site
  const baseUrl = 'https://moderneventghvendors.com';

  // Build the XML structure
  const urls = pages.map((page) => ({
    loc: `${baseUrl}/${page.slug}`, // URL of the page
    lastmod: page.updatedAt || new Date().toISOString(), // Last modification date
    changefreq: 'daily', // Frequency of changes (e.g., daily, weekly)
    priority: 0.7, // Priority of the page
  }));

  // Create XML string
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url) => `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
          <changefreq>${url.changefreq}</changefreq>
          <priority>${url.priority}</priority>
        </url>`
        )
        .join('')}
    </urlset>
  `;

  // Set header and return sitemap
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}

// Mock function to fetch dynamic data
async function fetchYourData() {
  // Replace this with your actual data fetching logic
  return [
    { slug: 'page-1', updatedAt: '2024-12-10T12:00:00Z' },
    { slug: 'page-2', updatedAt: '2024-12-11T12:00:00Z' },
  ];
}
