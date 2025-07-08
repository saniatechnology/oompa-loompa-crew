import React from "react";
import { useNavigate } from "react-router";
import "./WorkerCard.css";
import type { Worker } from "../types/Worker";

const WorkerCard: React.FC<Worker> = (workerData: Worker) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${workerData.id}`);
  };

  return (
    <button className="worker-card-button" onClick={handleClick}>
      <div className="worker-card">
        <div className="image-container">
          <img src={workerData.image} alt={`${workerData.firstName} ${workerData.lastName}`} className="worker-image" loading="lazy" />
        </div>
        <div className="worker-info">
          <h4 className="worker-name">
            {workerData.firstName} {workerData.lastName}
          </h4>
          <p className="worker-gender">{workerData.gender === "M" ? "Male" : "Female"}</p>
          <p className="worker-profession">{workerData.profession}</p>
        </div>
      </div>
    </button>
  );
};

export default React.memo(WorkerCard);
