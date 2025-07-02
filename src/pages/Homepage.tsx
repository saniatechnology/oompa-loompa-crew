import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${pageNum}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      if (json.results && json.results.length > 0) {
        setWorkersArray((prev) => [...prev, ...json.results]);
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  useEffect(() => {
    if (!hasMore || loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }
    return () => observer.current?.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="homepage">
      <h2>Find your Oompa Loompa</h2>
      <h3>There are more than 100k</h3>
      <ul className="worker-list">
        {workersArray.map((item) => (
          <WorkerCard key={item.id} id={item.id} first_name={item.first_name} last_name={item.last_name} image={item.image} gender={item.gender} profession={item.profession} />
        ))}
      </ul>
      <div ref={sentinelRef} style={{ height: 1 }} />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!hasMore && <div>No more results.</div>}
    </div>
  );
};

export default Homepage;
