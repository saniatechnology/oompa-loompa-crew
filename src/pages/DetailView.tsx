import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchOompaLoompaById } from "../api/oompaLoompaApi";
import { setWorkerDetail } from "../slices/oompaLoompaSlice";
import type { RootState, AppDispatch } from "../store";
import "./DetailView.css";

interface Favorite {
  color: string;
  food: string;
  random_string: string;
  song: string;
}

interface Worker {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  image: string;
  gender: string;
  profession: string;
  email?: string;
  country?: string;
  height?: number;
  favorite?: Favorite;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const workerId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const cachedDetail = useSelector((state: RootState) => state.oompaLoompa.details[workerId]);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const now = Date.now();
    if (cachedDetail && now - cachedDetail.lastFetched < ONE_DAY_MS) {
      setWorker(cachedDetail.worker);
      setLoading(false);
      setError(null);
      console.log("DetailView: Loaded worker from cache");
      return;
    }
    const fetchWorker = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchOompaLoompaById(workerId);
        setWorker(data);
        dispatch(setWorkerDetail({ id: workerId, worker: data, lastFetched: Date.now() }));
        console.log("DetailView: Fetched worker from server");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, [workerId, dispatch, cachedDetail]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!worker) return <div>Worker not found.</div>;

  return (
    <div className="detail-view">
      <img src={worker.image} alt={`${worker.first_name} ${worker.last_name}`} />
      <div className="detail-info">
        <div className="detail-info-header">
          <h2>
            {worker.first_name} {worker.last_name}
          </h2>
          <p className="detail-info-gender">{worker.gender === "M" ? "Male" : "Female"}</p>
          <p className="detail-info-profession">{worker.profession}</p>
        </div>
        <p>Age: {worker.age || "N/A"}</p>
        <p>Email: {worker.email || "N/A"}</p>
        <p>Country: {worker.country || "N/A"}</p>
        <p>Height: {worker.height || "N/A"}</p>
        {worker.favorite && (
          <>
            <p>Favorite color: {worker.favorite.color || "N/A"}</p>
            <p>Favorite food: {worker.favorite.food || "N/A"}</p>
            <p>Song:</p>
            <p style={{ whiteSpace: "pre-wrap" }}>{worker.favorite.song || "N/A"}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailView;
