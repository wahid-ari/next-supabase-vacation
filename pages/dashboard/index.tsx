import { LayoutListIcon, MapPinIcon, MountainSnowIcon, PalmtreeIcon, TentIcon, YoutubeIcon } from 'lucide-react';
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

import { CustomTooltip, CustomXAxisTick, RECHARTS_COLORS, renderColorfulLegendText } from '@/libs/recharts-setup';
import {
  // useCountsData,
  useStatisticDestinationByCategoryData,
  useStatisticDestinationByIslandData,
  useStatisticDestinationByProvinceData,
  useTotalCategoryData,
  useTotalDestinationData,
  useTotalInspirationData,
  useTotalIslandData,
  useTotalProvinceData,
  useTotalVideoData,
} from '@/libs/swr';
import useWindowSize from '@/hooks/use-window-size';

import Card from '@/components/card/Card';
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
  const { data: totalInspiration, error: errorTotalInspiration } = useTotalInspirationData();
  const { data: statisticDestinationByCategory, error: errorStatisticDestinationByCategory } =
    useStatisticDestinationByCategoryData();
  const { data: statisticDestinationByIsland, error: errorStatisticDestinationByIsland } =
    useStatisticDestinationByIslandData();
  const { data: statisticDestinationByProvince, error: errorStatisticDestinationByProvince } =
    useStatisticDestinationByProvinceData();

  if (
    // error ||
    errorTotalDestination ||
    errorTotalCategory ||
    errorTotalIsland ||
    errorTotalProvince ||
    errorTotalVideo ||
    errorTotalInspiration ||
    errorStatisticDestinationByCategory ||
    errorStatisticDestinationByIsland ||
    errorStatisticDestinationByProvince
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
        '/api/dashboard/total-inspiration',
        '/api/statistics/destination-by-category',
        '/api/statistics/destination-by-island',
        '/api/statistics/destination-by-province',
      ]}
      description='View and Manage Data - MyVacation'
    >
      <Titles>Dashboard</Titles>

      <div className='mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3'>
        {totalDestination ? (
          <Card
            title='Destination'
            link='/destination'
            count={totalDestination.destination}
            icon={<MountainSnowIcon className='size-12' />}
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
            icon={<LayoutListIcon className='size-12' />}
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
            icon={<PalmtreeIcon className='size-12' />}
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
            icon={<MapPinIcon className='size-12' />}
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
            icon={<YoutubeIcon className='size-12' />}
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
        {totalInspiration ? (
          <Card
            title='Inspiration'
            link='/inspiration'
            count={totalInspiration.inspiration}
            icon={<TentIcon className='size-12' />}
            data-testid='inspiration-count'
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
            <Card
              title='Destination'
              link='/destination'
              count={data.destination}
              icon={<MountainSnowIcon className='size-12' />}
            />
            <Card
              title='Category'
              link='/category'
              count={data.category}
              icon={<LayoutListIcon className='size-12' />}
            />
            <Card title='Island' link='/island' count={data.island} icon={<PalmtreeIcon className='size-12' />} />
            <Card title='Province' link='/province' count={data.province} icon={<MapPinIcon className='size-12' />} />
            <Card title='Video' link='/video' count={data.video} icon={<YoutubeIcon className='size-12' />} />
            <Card title='Inspiration' link='/inspiration' count={data.inspiration} icon={<TentIcon className='size-12' />} />
          </>
        ) : (
          [...Array(6).keys()].map((i) => (
            <Shimmer key={i}>
              <div className='space-y-3'>
                <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </div>
            </Shimmer>
          ))
        )}
      </div> */}

      <div className='mt-5 space-y-5'>
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Destination by Category</Text.medium>
            </div>
            {statisticDestinationByCategory ? (
              <div className='m-auto w-80 py-3'>
                {statisticDestinationByCategory.length > 0 ? (
                  <ResponsiveContainer width='99%' height={350}>
                    <PieChart data={statisticDestinationByCategory}>
                      <Pie
                        className='mb-4 focus:outline-1 focus:outline-sky-600 dark:focus:!outline-1 dark:focus:!outline-sky-500'
                        data={statisticDestinationByCategory}
                        dataKey='total'
                        type='monotone'
                        strokeWidth={2}
                        stroke={theme == 'dark' ? '#171717' : '#fff'}
                        innerRadius={windowSize.width < 450 ? 20 : 30}
                        outerRadius={windowSize.width < 450 ? 80 : 90}
                        label={true}
                      >
                        {statisticDestinationByCategory?.map((_, index) => (
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
                  <div className='flex h-40 items-center justify-center'>
                    <Text.medium>Total Destination by Category Data Not Found</Text.medium>
                  </div>
                )}
              </div>
            ) : (
              <div className='m-auto w-80 py-3'>
                <Shimmer className='m-auto size-64 rounded-full'>
                  <div className='h-full w-full rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                </Shimmer>
                <div className='mx-auto mb-3 mt-3 flex w-64 flex-wrap justify-center gap-x-4 gap-y-2'>
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
            {statisticDestinationByProvince ? (
              <div className='m-auto w-80 py-3'>
                {statisticDestinationByProvince.length > 0 ? (
                  <ResponsiveContainer width='99%' height={350}>
                    <PieChart data={statisticDestinationByProvince}>
                      <Pie
                        className='mb-4 focus:outline-1 focus:outline-sky-600 dark:focus:!outline-1 dark:focus:!outline-sky-500'
                        data={statisticDestinationByProvince}
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
                        {statisticDestinationByProvince?.map((_, index) => (
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
                  <div className='flex h-40 items-center justify-center'>
                    <Text.medium>Total Destination by Province Data Not Found</Text.medium>
                  </div>
                )}
              </div>
            ) : (
              <div className='m-auto w-80 py-3'>
                <Shimmer className='m-auto size-64 rounded-full'>
                  <div className='h-full w-full rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                </Shimmer>
                <div className='mx-auto mb-3 mt-3 flex w-64 flex-wrap justify-center gap-x-4 gap-y-2'>
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
            {statisticDestinationByIsland ? (
              statisticDestinationByIsland.length > 0 ? (
                <ResponsiveContainer width='99%' height={350}>
                  <BarChart
                    data={statisticDestinationByIsland}
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
                      {statisticDestinationByIsland?.map((_, index) => (
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
                <div className='flex h-40 items-center justify-center'>
                  <Text.medium>Total Destination by Island Data Not Found</Text.medium>
                </div>
              )
            ) : (
              <Shimmer className='rounded-xl'>
                <div className='flex flex-row items-end gap-2 sm:gap-4 md:gap-8 lg:gap-10'>
                  <div className='h-32 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='size-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-32 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='size-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
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
