import React, { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import WorkerCard from "../components/WorkerCard";
import "./Homepage.css";

interface OompaLoompa {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  image: string;
  gender: string;
  profession: string;
}

const Homepage: React.FC = () => {
  const [workersArray, setWorkersArray] = useState<OompaLoompa[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async (pageNum: number) => {
    console.log("Fetching page:", pageNum);
    setError(null);
    try {
      const res = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${pageNum}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      if (json.results && json.results.length > 0) {
        setWorkersArray((prev) => {
          const all = [...prev, ...json.results];
          const unique = Array.from(new Map(all.map((w) => [w.id, w])).values());
          return unique;
        });
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
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const filteredWorkers = workersArray.filter((worker) => {
    const query = search.toLowerCase();
    return worker.first_name.toLowerCase().includes(query) || worker.last_name.toLowerCase().includes(query) || worker.profession.toLowerCase().includes(query);
  });

  const fetchNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="homepage">
      <div className="search-bar">
        <span className="search-icon" role="img" aria-label="search">
          🔍
        </span>
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
