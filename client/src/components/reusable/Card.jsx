import React from "react";
import { FaUsers, FaDonate, FaBox, FaChartLine } from "react-icons/fa";

const Card = ({
  name,
  icon,
  total,
  bg = "blue",
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
}) => {
  // Predefined gradient backgrounds
  const gradients = {
    blue: "bg-gradient-to-r from-blue-500 to-cyan-500",
    green: "bg-gradient-to-r from-emerald-500 to-green-500",
    purple: "bg-gradient-to-r from-purple-500 to-pink-500",
    orange: "bg-gradient-to-r from-orange-500 to-amber-500",
    indigo: "bg-gradient-to-r from-indigo-500 to-blue-500",
    red: "bg-gradient-to-r from-red-500 to-pink-500",
    teal: "bg-gradient-to-r from-teal-500 to-emerald-500",
  };

  // Get the gradient class
  const gradientClass =
    typeof bg === "string" && gradients[bg] ? gradients[bg] : bg;

  return (
    <div
      className={`${gradientClass} rounded-2xl shadow-xl p-6 text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-medium opacity-90 mb-1">{name}</p>
          <h3 className="text-3xl font-bold">{total}</h3>
        </div>
        <div className={`p-3 rounded-xl ${iconBg} ${iconColor}`}>{icon}</div>
      </div>
    </div>
  );
};

export default Card;
