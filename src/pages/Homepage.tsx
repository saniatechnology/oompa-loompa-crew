import React, { useEffect, useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setPageData } from "../slices/oompaLoompaSlice";
import { fetchOompaLoompas } from "../api/oompaLoompaApi";
import WorkerCard from "../components/WorkerCard";
import SearchBar from "../components/SearchBar";
import "./Homepage.css";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const Homepage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pages = useSelector((state: RootState) => state.oompaLoompa.pages);
  const maxPage = Math.max(1, ...Object.keys(pages).map(Number));
  const [page, setPage] = useState(maxPage);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const workersArray = Object.values(pages)
    .flatMap((pageData) => pageData.workers)
    .filter((w, i, arr) => arr.findIndex((x) => x.id === w.id) === i); // Avoid duplicates

  const filteredWorkers = useMemo(() => {
    const query = search.toLowerCase();
    return workersArray.filter((worker) => worker.firstName.toLowerCase().includes(query) || worker.lastName.toLowerCase().includes(query) || worker.profession.toLowerCase().includes(query));
  }, [workersArray, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async (pageNum: number) => {
      const pageData = pages[pageNum];
      const now = Date.now();
      if (pageData && pageData.lastFetched && now - pageData.lastFetched < ONE_DAY_MS) {
        console.log(`Using cached data for page ${pageNum}, not refetching from API.`);
        setHasMore(true); // Assume more pages may exist
        return;
      }
      console.log("Fetching page from API:", pageNum);
      setError(null);
      try {
        const results = await fetchOompaLoompas(pageNum);
        if (results && results.length > 0) {
          dispatch(setPageData({ page: pageNum, workers: results, lastFetched: now }));
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchData(page);
  }, [page, pages, dispatch]);

  const fetchNext = () => {
    setPage(maxPage + 1);
  };

  return (
    <div className="homepage">
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <h2>Find your Oompa Loompa</h2>
      <h3>There are more than 100k</h3>
      <InfiniteScroll dataLength={filteredWorkers.length} next={fetchNext} hasMore={hasMore && !search} loader={<div>Loading...</div>} endMessage={<div>No more results.</div>}>
        <div className="worker-list">
          {filteredWorkers.map((workerData) => (
            <div key={workerData.id} className="worker-item">
              <WorkerCard {...workerData} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Homepage;
