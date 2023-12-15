import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const API_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}/api`;

// get total record count on each table for dashboard
export function useCountsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total destination record count for dashboard
export function useTotalDestinationData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-destination`, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading };
}

// get total category record count for dashboard
export function useTotalCategoryData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-category`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total island record count for dashboard
export function useTotalIslandData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-island`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total province record count for dashboard
export function useTotalProvinceData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-province`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total video record count for dashboard
export function useTotalVideoData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-video`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total inspiration record count for dashboard
export function useTotalInspirationData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-inspiration`, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading };
}

// Destination
export function useDestinationsData(params?: string) {
  const { data, error, isLoading } = useSWR(`${API_URL}/destination?${params}`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

export function useDestinationData(id: string, slug?: boolean) {
  const { data, error, isLoading } = useSWR(
    slug ? `${API_URL}/destination?slug=${slug}` : `${API_URL}/destination?id=${id}`,
    fetcher,
    { refreshInterval: 1000 },
  );
  return { data, error, isLoading };
}

// Video
export function useVideosData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/video`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

export function useVideoData(id: string, slug?: boolean) {
  const { data, error, isLoading } = useSWR(
    slug ? `${API_URL}/video?slug=${slug}` : `${API_URL}/video?id=${id}`,
    fetcher,
    { refreshInterval: 1000 },
  );
  return { data, error, isLoading };
}

// Island
export function useIslandsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/island`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

export function useIslandData(id: string, slug?: boolean) {
  const { data, error, isLoading } = useSWR(
    slug ? `${API_URL}/island?slug=${slug}` : `${API_URL}/island?id=${id}`,
    fetcher,
    { refreshInterval: 1000 },
  );
  return { data, error, isLoading };
}

// Category
export function useCategoriesData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/category`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

export function useCategoryData(id: string, slug?: boolean) {
  const { data, error, isLoading } = useSWR(
    slug ? `${API_URL}/category?slug=${slug}` : `${API_URL}/category?id=${id}`,
    fetcher,
    { refreshInterval: 1000 },
  );
  return { data, error, isLoading };
}

// get total Destination in each Category
export function useCategoryWithTotalDestinationData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/category/total-destination`, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading };
}

// Province
export function useProvincesData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/province`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

export function useProvinceData(id: string, slug?: boolean) {
  const { data, error, isLoading } = useSWR(
    slug ? `${API_URL}/province?slug=${slug}` : `${API_URL}/province?id=${id}`,
    fetcher,
    { refreshInterval: 1000 },
  );
  return { data, error, isLoading };
}

// Inspiration
export function useInspirationsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/inspiration`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

export function useInspirationData(id: string) {
  const { data, error, isLoading } = useSWR(`${API_URL}/inspiration?id=${id}`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// Search
export function useSearchData(query: string | string[]) {
  const { data, error, isLoading } = useSWR(`${API_URL}/search?q=${query}`, fetcher);
  return { data, error, isLoading };
}

// Statistic
export function useStatisticDestinationByCategoryData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/statistics/destination-by-category`, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading };
}

export function useStatisticDestinationByIslandData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/statistics/destination-by-island`, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading };
}

export function useStatisticDestinationByProvinceData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/statistics/destination-by-province`, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading };
}

// Activity
export function useLogsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/log`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

export function useSessionsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/session`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}
