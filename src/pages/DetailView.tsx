import React from "react";
import { useParams } from "react-router";

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Detail View for ID: {id}</div>;
};

export default DetailView;
