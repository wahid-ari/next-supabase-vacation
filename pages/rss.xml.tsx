const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

function generateSiteMap(destination: any) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss xmlns:blogChannel="${BASE_URL}/destinations" version="2.0">
    
    <channel>
      <title>My Vacation</title>
      <link>${BASE_URL}/destination</link>
      <description>Explore all Destination in My Vacation</description>
      <language>en-us</language>
      <generator>My Vacation</generator>
      <lastBuildDate>${new Date()}</lastBuildDate>
      <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
      <ttl>40</ttl>
      <image>
      <title>My Vacation</title>
      <url>${BASE_URL}/icon.svg</url>
      <link>${BASE_URL}/destinations</link>
      </image>
      <copyright>Copyright © 2023 My Vacation</copyright>
      ${destination
        .map((item: any) => {
          return `
            <item>
              <title>
                <![CDATA[ ${item.name} ]]>
              </title>
              <description>
                <![CDATA[ ${item.description.slice(0, 100)} ]]>
              </description>
              <pubDate>${item.created_at.split('T')[0]}</pubDate>
              <link>${BASE_URL}/destinations/${item.slug}</link>
              <guid>${BASE_URL}/destinations/${item.slug}</guid>
            </item>
          `;
        })
        .join('')}
    </channel>
    
    </rss>`;
}

export default function Rss() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const getAll = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/rss`);
  const { destination } = await getAll.json();

  // We generate the XML rss with the data
  const rss = generateSiteMap(destination);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(rss);
  res.end();

  return {
    props: {},
  };
}
