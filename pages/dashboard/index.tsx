import { useEffect, useState } from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { BookIcon, LayoutListIcon, UsersIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  BarChart,
  Bar as BarRecharts,
  CartesianGrid,
  Cell,
  Legend as LegendRecharts,
  PieChart,
  Pie as PieRecharts,
  ResponsiveContainer,
  Tooltip as TooltipRecharts,
  XAxis,
  YAxis,
} from 'recharts';

import {
  useBookByAuthorData,
  useBookByGenreData,
  useCountsData,
  useTotalAuthorsData,
  useTotalBooksData,
  useTotalGenresData,
} from '@/libs/swr';
import { options, optionsBarChart, optionsHorizontalBarChart, populateData } from '@/utils/chart-setup';
import { CustomTooltip, CustomXAxisTick, RECHARTS_COLORS, renderColorfulLegendText } from '@/utils/recharts-setup';
import useWindowSize from '@/hooks/use-window-size';

import Card from '@/components/dashboard/Card';
import Layout from '@/components/layout/Layout';
import Shimmer from '@/components/systems/Shimmer';
import Text from '@/components/systems/Text';
import Titles from '@/components/systems/Title';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);

// Dashboard.auth = true;

export default function Dashboard() {
  const { theme } = useTheme();
  const windowSize = useWindowSize();
  // const { data, error } = useCountsData();
  const { data: totalAuthors, error: errorTotalAuthors } = useTotalAuthorsData();
  const { data: totalBooks, error: errorTotalBooks } = useTotalBooksData();
  const { data: totalGenres, error: errorTotalGenres } = useTotalGenresData();
  const { data: bookByGenre, error: errorBookByGenre } = useBookByGenreData();
  const { data: bookByAuthor, error: errorBookByAuthor } = useBookByAuthorData();

  const [dataBookByGenre, setDataBookByGenre] = useState(null);
  const [dataBookByAuthor, setDataBookByAuthor] = useState(null);

  useEffect(() => {
    if (bookByGenre !== undefined) setDataBookByGenre(populateData(bookByGenre, 'book'));
    if (bookByAuthor !== undefined) setDataBookByAuthor(populateData(bookByAuthor, 'book'));
  }, [bookByGenre, bookByAuthor]);

  if (
    // error ||
    errorTotalAuthors ||
    errorTotalBooks ||
    errorTotalGenres ||
    errorBookByAuthor ||
    errorBookByGenre
  ) {
    return (
      <Layout title='Dashboard - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title='Dashboard - MyVacation'
      prefetch={[
        '/api/dashboard/total-authors',
        '/api/dashboard/total-books',
        '/api/dashboard/total-genres',
        '/api/statistics/book-by-author',
        '/api/statistics/book-by-genre',
      ]}
      description='View and Manage Data - MyVacation'
    >
      <Titles>Dashboard</Titles>

      <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {totalAuthors ? (
          <Card
            title='Author'
            link='/author'
            count={totalAuthors.authors}
            icon={<UsersIcon className='h-12 w-12' />}
            data-testid='author-count'
          />
        ) : (
          <Shimmer>
            <div className='space-y-3'>
              <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        )}
        {totalBooks ? (
          <Card
            title='Book'
            link='/book'
            count={totalBooks.books}
            icon={<BookIcon className='h-12 w-12' />}
            data-testid='book-count'
          />
        ) : (
          <Shimmer>
            <div className='space-y-3'>
              <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        )}
        {totalGenres ? (
          <Card
            title='Genre'
            link='/genre'
            count={totalGenres.genres}
            icon={<LayoutListIcon className='h-12 w-12' />}
            data-testid='genre-count'
          />
        ) : (
          <Shimmer>
            <div className='space-y-3'>
              <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        )}
      </div>
      {/* <div className='mt-8 grid grid-cols-1 gap-4 min-[350px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {data ? (
          <>
            <Card title='Author' link='/author' count={data.authors} icon={<UserGroupIcon />} />
            <Card title='Book' link='/book' count={data.books} icon={<BookOpenIcon />} />
            <Card title='Quote' link='/quote' count={data.quotes} icon={<AnnotationIcon />} />
            <Card title='Genre' link='/genre' count={data.genres} icon={<ColorSwatchIcon />} />
            <Card title='Tag' link='/tag' count={data.tags} icon={<CollectionIcon />} />
          </>
        ) : (
          <>
            <Shimmer className='!h-24 w-full' />
            <Shimmer className='!h-24 w-full' />
            <Shimmer className='!h-24 w-full' />
            <Shimmer className='!h-24 w-full' />
            <Shimmer className='!h-24 w-full' />
          </>
        )}
      </div> */}

      <div className='mt-5 grid grid-cols-1 gap-5'>
        <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
          <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
            <Text.medium>Total Book by Genre (Recharts)</Text.medium>
          </div>
          {bookByGenre ? (
            <div className='m-auto w-80 py-3'>
              <ResponsiveContainer width='100%' height={350}>
                <PieChart data={bookByGenre}>
                  <PieRecharts
                    className='focus:outline-1 dark:focus:!outline-1 focus:outline-sky-600 dark:focus:!outline-sky-500 mb-4'
                    data={bookByGenre}
                    dataKey='total'
                    type='monotone'
                    strokeWidth={2}
                    stroke={theme == 'dark' ? '#171717' : '#fff'}
                    fill='#adfa1d'
                    cx='50%'
                    cy='50%'
                    innerRadius={windowSize.width < 450 ? 50 : 60}
                    outerRadius={windowSize.width < 450 ? 80 : 90}
                    label={true}
                    labelLine={true}
                    paddingAngle={1}
                  >
                    {bookByGenre?.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={RECHARTS_COLORS[index % RECHARTS_COLORS.length]} />
                    ))}
                  </PieRecharts>
                  <TooltipRecharts
                    content={<CustomTooltip category='Genre' />}
                    cursor={{
                      stroke: theme == 'dark' ? '#525252' : '#a3a3a3',
                      strokeWidth: 1,
                      fill: 'transparent',
                      strokeDasharray: 10,
                    }}
                  />
                  <LegendRecharts formatter={renderColorfulLegendText} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className='py-3 w-80 m-auto'>
              <Shimmer className='w-64 h-64 m-auto rounded-full'>
                <div className='h-full w-full rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </Shimmer>
              <div className='mt-3 w-64 mx-auto flex flex-wrap justify-center gap-y-2 gap-x-4 mb-3'>
                <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </div>
            </div>
          )}
        </div>

        <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
          <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
            <Text.medium>Total Book by Author (Recharts)</Text.medium>
          </div>
          <div className='m-auto p-3'>
            {bookByAuthor ? (
              <ResponsiveContainer width='100%' height={350}>
                <BarChart
                  data={bookByAuthor}
                  barCategoryGap={
                    windowSize.width > 1200 ? 20 : windowSize.width > 900 ? 15 : windowSize.width > 600 ? 10 : 5
                  }
                >
                  <XAxis
                    dataKey='label'
                    // label="Height"
                    stroke={theme == 'dark' ? '#a3a3a3' : '#525252'}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    height={65}
                    interval={0}
                    tick={<CustomXAxisTick />}
                  />
                  <YAxis
                    stroke={theme == 'dark' ? '#a3a3a3' : '#525252'}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <BarRecharts dataKey='total' fill='#adfa1d' radius={[4, 4, 0, 0]}>
                    {bookByAuthor?.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={RECHARTS_COLORS[index % RECHARTS_COLORS.length]} />
                    ))}
                  </BarRecharts>
                  <TooltipRecharts
                    content={<CustomTooltip category='Author' />}
                    cursor={{
                      stroke: theme == 'dark' ? '#525252' : '#a3a3a3',
                      strokeWidth: 1,
                      fill: 'transparent',
                      strokeDasharray: 10,
                    }}
                  />
                  {/* <CartesianGrid strokeDasharray='4' /> */}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Shimmer className='rounded-xl px-8'>
                <div className='flex flex-row items-end gap-2 sm:gap-4 md:gap-8 lg:gap-10'>
                  <div className='h-32 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-16 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-32 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-16 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                </div>
              </Shimmer>
            )}
          </div>
        </div>

        {dataBookByGenre ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Book by Genre</Text.medium>
            </div>
            <div className='m-auto w-72 sm:w-80 py-3'>
              <Pie options={options} data={dataBookByGenre} />
            </div>
          </div>
        ) : (
          <Shimmer className='!h-[400px] w-full' />
        )}

        {dataBookByAuthor ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Book by Author</Text.medium>
            </div>
            <div className='p-3'>
              <Bar
                options={optionsBarChart(theme)}
                data={dataBookByAuthor}
                height={
                  windowSize.width > 800 ? 100 : windowSize.width > 640 ? 150 : windowSize.width > 480 ? 250 : 350
                }
              />
            </div>
          </div>
        ) : (
          <Shimmer className='!h-[400px] w-full' />
        )}
      </div>
    </Layout>
  );
}
