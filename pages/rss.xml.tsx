const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

// add a leading 0 to a number if it is only one digit
function addLeadingZero(num: string) {
  return num.length < 2 ? `0${num}` : `${num}`;
}

function buildRFC822Date(dateString: string) {
  const dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // 2023-10-28T16:04:37.319192+00:00
  const timeStamp = Date.parse(dateString);
  const date = new Date(timeStamp);

  const day = dayStrings[date.getDay()];
  const dayNumber = addLeadingZero(date.getDate().toString());
  const month = monthStrings[date.getMonth()];
  const year = date.getFullYear();
  const time = `${addLeadingZero(date.getHours().toString())}:${addLeadingZero(date.getMinutes().toString())}:00`;
  const timezone = 'GMT';

  //Wed, 02 Oct 2002 13:00:00 GMT
  return `${day}, ${dayNumber} ${month} ${year} ${time} ${timezone}`;
}

function generateSiteMap(destination: any) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss xmlns:blogChannel="${BASE_URL}/destinations" version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    
    <channel>
      <title>My Vacation</title>
      <link>${BASE_URL}/destination</link>
      <description>Explore all Destination in My Vacation</description>
      <language>en-us</language>
      <generator>My Vacation</generator>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
      <ttl>40</ttl>
      <image>
      <title>My Vacation</title>
      <url>${BASE_URL}/icon.svg</url>
      <link>${BASE_URL}/icon.svg</link>
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
              <pubDate>${buildRFC822Date(item.created_at)}</pubDate>
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

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // we send the XML to the browser
  res.write(rss);
  res.end();

  return {
    props: {},
  };
}
