import { NextApiRequest } from 'next';
import { ImageResponse } from 'next/og';

export const config = {
  runtime: 'edge',
};

const wrapperClassName = {
  fontSize: 60,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative' as 'relative',
};

// TODO OG Images
export default async function handler(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const titleLength = hasTitle ? searchParams.get('title')?.slice(0, 70) : 'MyVacation';
    let title = titleLength.length == 70 ? titleLength + '...' : titleLength;
    title = title || 'MyVacation';

    return new ImageResponse(
      (
        <div style={wrapperClassName}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt='bg'
            width='100%'
            height='100%'
            src={`${process.env.NEXT_PUBLIC_API_ROUTE}/ogs.png`}
            style={{
              position: 'absolute',
            }}
          />

          <div tw='flex items-center text-white absolute left-20'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-palmtree'
            >
              <path d='M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4' />
              <path d='M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3' />
              <path d='M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35z' />
              <path d='M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14' />
            </svg>
            <p
              tw='text-3xl font-extrabold ml-2'
              style={{
                fontWeight: 600,
              }}
            >
              <b>MyVacation</b>
            </p>
          </div>

          <h1
            tw='mx-20 my-auto relative pr-4'
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              textShadow: '0 2px 30px #000',
              letterSpacing: -4,
              backgroundImage: 'linear-gradient(90deg, #fff 40%, #aaa)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              position: 'absolute',
              bottom: 70,
              left: 80,
              margin: 0,
              fontSize: 26,
              letterSpacing: -1,
              color: '#fff',
            }}
          >
            Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations.
          </p>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  } catch (e) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
