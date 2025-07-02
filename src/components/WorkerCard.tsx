import React from "react";
import "./WorkerCard.css";

interface WorkerCardProps {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  gender: string;
  profession: string;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ id, first_name, last_name, image, gender, profession }) => {
  return (
    <div className="worker-card">
      <img src={image} alt={`${first_name} ${last_name}`} />
      <div className="worker-details">
        <div className="worker-id">ID: {id}</div>
        <div className="worker-name">
          {first_name} {last_name}
        </div>
        <div className="worker-gender">{gender}</div>
        <div className="worker-profession">{profession}</div>
      </div>
    </div>
  );
};

export default WorkerCard;
