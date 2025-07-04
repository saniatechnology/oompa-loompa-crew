import React from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <button className="worker-card-button" onClick={handleClick} style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}>
      <div className="worker-card">
        <img src={image} alt={`${first_name} ${last_name}`} className="worker-image" />
        <div className="worker-info">
          <h4>
            {first_name} {last_name}
          </h4>
          <p>{profession}</p>
          <p>{gender}</p>
        </div>
      </div>
    </button>
  );
};

export default WorkerCard;
