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
    <button className="worker-card-button" onClick={handleClick}>
      <div className="worker-card">
        <div className="image-container">
          <img src={image} alt={`${first_name} ${last_name}`} className="worker-image" loading="lazy" />
        </div>
        <div className="worker-info">
          <h4 className="worker-name">
            {first_name} {last_name}
          </h4>
          <p className="worker-gender">{gender === "M" ? "Male" : "Female"}</p>
          <p className="worker-profession">{profession}</p>
        </div>
      </div>
    </button>
  );
};

export default React.memo(WorkerCard);
