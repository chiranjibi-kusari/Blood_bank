// components/charts/BloodTypeBarChart.jsx
import React from "react";
import { useCookies } from "react-cookie";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BloodTypeBarChartSingle = ({ donationData, title, name }) => {
  const [cookies] = useCookies(["role"]);
  const role = cookies.role;

  // Prepare data for chart
  const chartData = [
    {
      bloodType: "A+",
      available: donationData?.pagination?.totalAPositive || 0,
    },
    {
      bloodType: "A-",
      available: donationData?.pagination?.totalANegative || 0,
    },
    {
      bloodType: "B+",
      available: donationData?.pagination?.totalBPositive || 0,
    },
    {
      bloodType: "B-",
      available: donationData?.pagination?.totalBNegative || 0,
    },
    {
      bloodType: "O+",
      available: donationData?.pagination?.totalOPositive || 0,
    },
    {
      bloodType: "O-",
      available: donationData?.pagination?.totalONegative || 0,
    },
    {
      bloodType: "AB+",
      available: donationData?.pagination?.totalABPositive || 0,
    },
    {
      bloodType: "AB-",
      available: donationData?.pagination?.totalABNegative || 0,
    },
  ];

  // Colors for each blood type
  const bloodTypeColors = {
    "A+": "#8884d8",
    "A-": "#82ca9d",
    "B+": "#ffc658",
    "B-": "#ff7300",
    "O+": "#387908",
    "O-": "#000000",
    "AB+": "#ff0000",
    "AB-": "#00ffff",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{`Blood Type: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} units`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bloodType" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="available"
            name={name}
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={bloodTypeColors[entry.bloodType]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodTypeBarChartSingle;
