const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

function generateSiteMap(destination: any, category: any, island: any, province: any) {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${BASE_URL}/destinations</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/categories</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/islands</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/provinces</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/videos</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/inspirations</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/browse</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/login</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>

    ${destination
      .map((item: any) => {
        return `
        <url>
          <loc>${`${BASE_URL}/destinations/${item.slug}`}</loc>
          <lastmod>${today.toISOString()}</lastmod>
        </url>
      `;
      })
      .join('')}
  
    ${category
      .map((item: any) => {
        return `
      <url>
        <loc>${`${BASE_URL}/categories/${item.slug}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
      })
      .join('')}
    
    ${island
      .map((item: any) => {
        return `
      <url>
        <loc>${`${BASE_URL}/islands/${item.slug}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
      })
      .join('')}
    
    ${province
      .map((item: any) => {
        return `
      <url>
        <loc>${`${BASE_URL}/provinces/${item.slug}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
      })
      .join('')}

    </urlset>
  `;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const getAll = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/sitemap`);
  const { destination, category, island, province } = await getAll.json();

  // We generate the XML sitemap with the data
  const sitemap = generateSiteMap(destination, category, island, province);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
