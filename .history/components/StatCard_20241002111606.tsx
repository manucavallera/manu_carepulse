import React from "react";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return <div>StatCard</div>;
};

export default StatCard;
