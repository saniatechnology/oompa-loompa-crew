import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectAllWorkers } from "../slices/oompaLoompaSlice";

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const workerId = Number(id);

  const workers = useSelector(selectAllWorkers);

  const worker = workers.find((w) => w.id === workerId);

  if (!worker) {
    return <div>Worker not found in cache. Please go back to the homepage and scroll until this worker is loaded.</div>;
  }

  return (
    <div>
      <h2>
        {worker.first_name} {worker.last_name}
      </h2>
      <img src={worker.image} alt={`${worker.first_name} ${worker.last_name}`} />
      <p>Profession: {worker.profession}</p>
      <p>Gender: {worker.gender}</p>
      <p>Age: {worker.age}</p>
      {worker.email && <p>Email: {worker.email}</p>}
      {worker.country && <p>Country: {worker.country}</p>}
      {worker.height && <p>Height: {worker.height}</p>}
      {worker.favorite && (
        <div>
          <h3>Favorites</h3>
          <p>Color: {worker.favorite.color}</p>
          <p>Food: {worker.favorite.food}</p>
          <p>Random String: {worker.favorite.random_string}</p>
          <div>
            <strong>Song:</strong>
            <pre style={{ whiteSpace: "pre-wrap" }}>{worker.favorite.song}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailView;
