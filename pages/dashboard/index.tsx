import { LayoutListIcon, MapPinIcon, MountainSnowIcon, PalmtreeIcon, YoutubeIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Bar,
  BarChart,
  // CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  useDestinationByCategoryData,
  // useCountsData,
  useDestinationByIslandData,
  useDestinationByProvinceData,
  useTotalCategoryData,
  useTotalDestinationData,
  useTotalIslandData,
  useTotalProvinceData,
  useTotalVideoData,
} from '@/libs/swr';
import { CustomTooltip, CustomXAxisTick, RECHARTS_COLORS, renderColorfulLegendText } from '@/utils/recharts-setup';
import useWindowSize from '@/hooks/use-window-size';

import Card from '@/components/dashboard/Card';
import Layout from '@/components/layout/Layout';
import Shimmer from '@/components/systems/Shimmer';
import Text from '@/components/systems/Text';
import Titles from '@/components/systems/Title';

// Dashboard.auth = true;

export default function Dashboard() {
  const { theme } = useTheme();
  const windowSize = useWindowSize();
  // const { data, error } = useCountsData();
  const { data: totalDestination, error: errorTotalDestination } = useTotalDestinationData();
  const { data: totalCategory, error: errorTotalCategory } = useTotalCategoryData();
  const { data: totalIsland, error: errorTotalIsland } = useTotalIslandData();
  const { data: totalProvince, error: errorTotalProvince } = useTotalProvinceData();
  const { data: totalVideo, error: errorTotalVideo } = useTotalVideoData();
  const { data: destinationByCategory, error: errorDestinationByCategory } = useDestinationByCategoryData();
  const { data: destinationByIsland, error: errorDestinationByIsland } = useDestinationByIslandData();
  const { data: destinationByProvince, error: errorDestinationByProvince } = useDestinationByProvinceData();

  if (
    // error ||
    errorTotalDestination ||
    errorTotalCategory ||
    errorTotalIsland ||
    errorTotalProvince ||
    errorTotalVideo ||
    errorDestinationByCategory ||
    errorDestinationByIsland ||
    errorDestinationByProvince
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
        '/api/dashboard/total-destination',
        '/api/dashboard/total-category',
        '/api/dashboard/total-island',
        '/api/dashboard/total-province',
        '/api/dashboard/total-video',
        '/api/statistics/destination-by-category',
        '/api/statistics/destination-by-island',
        '/api/statistics/destination-by-province',
      ]}
      description='View and Manage Data - MyVacation'
    >
      <Titles>Dashboard</Titles>

      <div className='mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-5'>
        {totalDestination ? (
          <Card
            title='Destination'
            link='/destination'
            count={totalDestination.destination}
            icon={<MountainSnowIcon className='h-12 w-12' />}
            data-testid='destination-count'
          />
        ) : (
          <Shimmer>
            <div className='space-y-3'>
              <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        )}
        {totalCategory ? (
          <Card
            title='Category'
            link='/category'
            count={totalCategory.category}
            icon={<LayoutListIcon className='h-12 w-12' />}
            data-testid='category-count'
          />
        ) : (
          <Shimmer>
            <div className='space-y-3'>
              <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        )}
        {totalIsland ? (
          <Card
            title='Island'
            link='/island'
            count={totalIsland.island}
            icon={<PalmtreeIcon className='h-12 w-12' />}
            data-testid='island-count'
          />
        ) : (
          <Shimmer>
            <div className='space-y-3'>
              <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        )}
        {totalProvince ? (
          <Card
            title='Province'
            link='/province'
            count={totalProvince.province}
            icon={<MapPinIcon className='h-12 w-12' />}
            data-testid='province-count'
          />
        ) : (
          <Shimmer>
            <div className='space-y-3'>
              <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        )}
        {totalVideo ? (
          <Card
            title='Video'
            link='/video'
            count={totalVideo.video}
            icon={<YoutubeIcon className='h-12 w-12' />}
            data-testid='video-count'
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

      <div className='mt-5 space-y-5'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Destination by Category</Text.medium>
            </div>
            {destinationByCategory ? (
              <div className='m-auto w-80 py-3'>
                {destinationByCategory.length > 0 ? (
                  <ResponsiveContainer width='99%' height={350}>
                    <PieChart data={destinationByCategory}>
                      <Pie
                        className='focus:outline-1 dark:focus:!outline-1 focus:outline-sky-600 dark:focus:!outline-sky-500 mb-4'
                        data={destinationByCategory}
                        dataKey='total'
                        type='monotone'
                        strokeWidth={2}
                        stroke={theme == 'dark' ? '#171717' : '#fff'}
                        innerRadius={windowSize.width < 450 ? 20 : 30}
                        outerRadius={windowSize.width < 450 ? 80 : 90}
                        label={true}
                      >
                        {destinationByCategory?.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={RECHARTS_COLORS[index + (1 % RECHARTS_COLORS.length)]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={<CustomTooltip category='Category' />}
                        cursor={{
                          stroke: theme == 'dark' ? '#525252' : '#a3a3a3',
                          strokeWidth: 1,
                          fill: 'transparent',
                          strokeDasharray: 10,
                        }}
                      />
                      <Legend formatter={renderColorfulLegendText} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className='h-40 flex items-center justify-center'>
                    <Text.medium>Total Destination by Category Data Not Found</Text.medium>
                  </div>
                )}
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
              <Text.medium>Total Destination by Province</Text.medium>
            </div>
            {destinationByProvince ? (
              <div className='m-auto w-80 py-3'>
                {destinationByProvince.length > 0 ? (
                  <ResponsiveContainer width='99%' height={350}>
                    <PieChart data={destinationByProvince}>
                      <Pie
                        className='focus:outline-1 dark:focus:!outline-1 focus:outline-sky-600 dark:focus:!outline-sky-500 mb-4'
                        data={destinationByProvince}
                        dataKey='total'
                        type='monotone'
                        strokeWidth={2}
                        stroke={theme == 'dark' ? '#171717' : '#fff'}
                        fill='#adfa1d'
                        innerRadius={windowSize.width < 450 ? 50 : 60}
                        outerRadius={windowSize.width < 450 ? 80 : 90}
                        label={true}
                        labelLine={true}
                        paddingAngle={1}
                      >
                        {destinationByProvince?.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={RECHARTS_COLORS[index % RECHARTS_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={<CustomTooltip category='Province' />}
                        cursor={{
                          stroke: theme == 'dark' ? '#525252' : '#a3a3a3',
                          strokeWidth: 1,
                          fill: 'transparent',
                          strokeDasharray: 10,
                        }}
                      />
                      <Legend formatter={renderColorfulLegendText} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className='h-40 flex items-center justify-center'>
                    <Text.medium>Total Destination by Province Data Not Found</Text.medium>
                  </div>
                )}
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
        </div>

        <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
          <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
            <Text.medium>Total Destination by Island</Text.medium>
          </div>
          <div className='m-auto p-3'>
            {destinationByIsland ? (
              destinationByIsland.length > 0 ? (
                <ResponsiveContainer width='99%' height={350}>
                  <BarChart
                    data={destinationByIsland}
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
                    <Bar dataKey='total' fill='#adfa1d' radius={[4, 4, 0, 0]}>
                      {destinationByIsland?.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={RECHARTS_COLORS[index % RECHARTS_COLORS.length]} />
                      ))}
                    </Bar>
                    <Tooltip
                      content={<CustomTooltip category='Island' />}
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
                <div className='h-40 flex items-center justify-center'>
                  <Text.medium>Total Destination by Island Data Not Found</Text.medium>
                </div>
              )
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
      </div>
    </Layout>
  );
}
