const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

function generateSiteMap(books: any) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss xmlns:blogChannel="${BASE_URL}/books" version="2.0">
    
    <channel>
      <title>Next.js App Router</title>
      <link>${BASE_URL}/books</link>
      <description>Next.js App Router Description</description>
      <language>en-us</language>
      <generator>Next.js App Router</generator>
      <lastBuildDate>${new Date()}</lastBuildDate>
      <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
      <ttl>40</ttl>
      <image>
      <title>Next.js App Router</title>
      <url>${BASE_URL}/icon.svg</url>
      <link>${BASE_URL}/books</link>
      </image>
      <copyright>Copyright © 2023 Next.js App Router</copyright>
      ${books
        .map((book: any) => {
          return `
            <item>
              <title>
                <![CDATA[ ${book.title} ]]>
              </title>
              <description>
                <![CDATA[ ${book.description.slice(0, 100)} ]]>
              </description>
              <pubDate>${book.created_at.split('T')[0]}</pubDate>
              <link>${BASE_URL}/books/${book.slug}</link>
              <guid>${BASE_URL}/books/${book.slug}</guid>
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
  const { books } = await getAll.json();

  // We generate the XML rss with the data
  const rss = generateSiteMap(books);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(rss);
  res.end();

  return {
    props: {},
  };
}
