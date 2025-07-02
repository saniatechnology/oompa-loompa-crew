import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState<OompaLoompa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=1")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        setData(json.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="homepage">
      <h2>Find your Oompa Loompa</h2>
      <h3>There are more than 100k</h3>
      <ul className="worker-list">
        {data.map((item) => (
          <WorkerCard id={item.id} first_name={item.first_name} last_name={item.last_name} image={item.image} gender={item.gender} profession={item.profession} />
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
