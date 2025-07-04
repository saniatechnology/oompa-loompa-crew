import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setPageData } from "../slices/oompaLoompaSlice";
import { fetchOompaLoompas } from "../api/oompaLoompaApi";
import WorkerCard from "../components/WorkerCard";
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

  // Flatten all workers from all fetched pages
  const workersArray = Object.values(pages)
    .flatMap((pageData) => pageData.workers)
    .filter((w, i, arr) => arr.findIndex((x) => x.id === w.id) === i); // unique by id

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
        const json = await fetchOompaLoompas(pageNum);
        if (json.results && json.results.length > 0) {
          dispatch(setPageData({ page: pageNum, workers: json.results, lastFetched: now }));
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

  const filteredWorkers = workersArray.filter((worker) => {
    const query = search.toLowerCase();
    return worker.first_name.toLowerCase().includes(query) || worker.last_name.toLowerCase().includes(query) || worker.profession.toLowerCase().includes(query);
  });

  const fetchNext = () => {
    setPage(maxPage + 1);
  };

  return (
    <div className="homepage">
      <div className="search-bar">
        <img className="search-icon" src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png" alt="search" />
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <h2>Find your Oompa Loompa</h2>
      <h3>There are more than 100k</h3>
      <InfiniteScroll dataLength={filteredWorkers.length} next={fetchNext} hasMore={hasMore && !search} loader={<div>Loading...</div>} endMessage={<div>No more results.</div>}>
        <div className="worker-list">
          {filteredWorkers.map((item) => (
            <div key={item.id} className="worker-item">
              <WorkerCard id={item.id} first_name={item.first_name} last_name={item.last_name} image={item.image} gender={item.gender} profession={item.profession} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Homepage;
