import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const searchHistoryAtom = atomWithStorage('my-vacation-search-history', {
  destination: [],
  video: [],
});

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  // Destination
  function addDestinationHistory(item: any) {
    setSearchHistory((prev) => ({ ...prev, destination: searchHistory.destination?.concat(item) }));
  }
  function removeDestinationHistory(id: any) {
    let filter = searchHistory.destination?.filter((item) => item.id !== id);
    setSearchHistory((prev) => ({ ...prev, destination: filter }));
  }
  function resetDestinationHistory() {
    setSearchHistory((prev) => ({ ...prev, destination: [] }));
  }
  // Video
  function addVideoHistory(item: any) {
    setSearchHistory((prev) => ({ ...prev, video: searchHistory.video?.concat(item) }));
  }
  function removeVideoHistory(id: any) {
    let filter = searchHistory.video?.filter((item) => item.id !== id);
    setSearchHistory((prev) => ({ ...prev, video: filter }));
  }
  function resetVideoHistory() {
    setSearchHistory((prev) => ({ ...prev, video: [] }));
  }
  // Reset
  function resetAllSearchHistory() {
    setSearchHistory({
      destination: [],
      video: [],
    });
  }
  return {
    searchHistory,
    setSearchHistory,
    // Destination
    addDestinationHistory,
    removeDestinationHistory,
    resetDestinationHistory,
    //Video
    addVideoHistory,
    removeVideoHistory,
    resetVideoHistory,
    // Reset
    resetAllSearchHistory,
  };
}

export function compareSearchResult(history: any, newResults: any) {
  let newHistory = history;
  // iterate each search result
  for (const newResult of newResults) {
    // check if new result already in the history
    const exists = history.findIndex((item) => item.id == newResult.id) > -1;
    if (!exists) {
      newHistory.push(newResult);
    }
  }
  return newHistory;
}
