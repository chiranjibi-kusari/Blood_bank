//// components/charts/BloodTypeBarChart.jsx
//import React from "react";
//import {
//  BarChart,
//  Bar,
//  XAxis,
//  YAxis,
//  CartesianGrid,
//  Tooltip,
//  Legend,
//  ResponsiveContainer,
//  Cell,
//} from "recharts";

//const BloodTypeBarChart = ({
//  donationData,
//  requestData,
//  title,
//  name1,
//  name2,
//}) => {
//  // Prepare data for chart
//  const chartData = [
//    {
//      bloodType: "A+",
//      available: donationData?.pagination?.totalAPositive || 0,
//      requested: requestData?.pagination?.totalAPositive || 0,
//    },
//    {
//      bloodType: "A-",
//      available: donationData?.pagination?.totalANegative || 0,
//      requested: requestData?.pagination?.totalANegative || 0,
//    },
//    {
//      bloodType: "B+",
//      available: donationData?.pagination?.totalBPositive || 0,
//      requested: requestData?.pagination?.totalBPositive || 0,
//    },
//    {
//      bloodType: "B-",
//      available: donationData?.pagination?.totalBNegative || 0,
//      requested: requestData?.pagination?.totalBNegative || 0,
//    },
//    {
//      bloodType: "O+",
//      available: donationData?.pagination?.totalOPositive || 0,
//      requested: requestData?.pagination?.totalOPositive || 0,
//    },
//    {
//      bloodType: "O-",
//      available: donationData?.pagination?.totalONegative || 0,
//      requested: requestData?.pagination?.totalONegative || 0,
//    },
//    {
//      bloodType: "AB+",
//      available: donationData?.pagination?.totalABPositive || 0,
//      requested: requestData?.pagination?.totalABPositive || 0,
//    },
//    {
//      bloodType: "AB-",
//      available: donationData?.pagination?.totalABNegative || 0,
//      requested: requestData?.pagination?.totalABNegative || 0,
//    },
//  ];

//  // Colors for each blood type
//  const bloodTypeColors = {
//    "A+": "#8884d8",
//    "A-": "#82ca9d",
//    "B+": "#ffc658",
//    "B-": "#ff7300",
//    "O+": "#387908",
//    "O-": "#000000",
//    "AB+": "#ff0000",
//    "AB-": "#00ffff",
//  };

//  const CustomTooltip = ({ active, payload, label }) => {
//    if (active && payload && payload.length) {
//      return (
//        <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
//          <p className="font-semibold">{`Blood Type: ${label}`}</p>
//          {payload.map((entry, index) => (
//            <p key={index} style={{ color: entry.color }}>
//              {`${entry.name}: ${entry.value} units`}
//            </p>
//          ))}
//        </div>
//      );
//    }
//    return null;
//  };

//  return (
//    <div className="bg-white p-6 rounded-lg shadow-md">
//      <h3 className="text-lg font-semibold mb-4">{title}</h3>
//      <ResponsiveContainer width="100%" height={400}>
//        <BarChart
//          data={chartData}
//          margin={{
//            top: 20,
//            right: 30,
//            left: 20,
//            bottom: 5,
//          }}
//        >
//          <CartesianGrid strokeDasharray="3 3" />
//          <XAxis dataKey="bloodType" />
//          <YAxis />
//          <Tooltip content={<CustomTooltip />} />
//          <Legend />
//          <Bar
//            dataKey="available"
//            name={name1}
//            fill="#8884d8"
//            radius={[4, 4, 0, 0]}
//          >
//            {chartData.map((entry, index) => (
//              <Cell
//                key={`cell-${index}`}
//                fill={bloodTypeColors[entry.bloodType]}
//              />
//            ))}
//          </Bar>
//          <Bar
//            dataKey="requested"
//            name={name2}
//            fill="#82ca9d"
//            radius={[4, 4, 0, 0]}
//          />
//        </BarChart>
//      </ResponsiveContainer>
//    </div>
//  );
//};

//export default BloodTypeBarChart;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Helper function to count blood groups
const countByBloodGroup = (items, bloodGroupField = "blood_group") => {
  const counts = {
    "A+": 0,
    "A-": 0,
    "B+": 0,
    "B-": 0,
    "O+": 0,
    "O-": 0,
    "AB+": 0,
    "AB-": 0,
  };
  items?.forEach((item) => {
    const bg = item[bloodGroupField];
    if (counts.hasOwnProperty(bg)) counts[bg] += 1;
  });
  return counts;
};

const BloodTypeBarChart = ({
  donationData,
  requestData,
  title,
  name1,
  name2,
}) => {
  const donations = donationData?.donors || [];
  const requests = requestData?.match_requests || [];

  const donationCounts = countByBloodGroup(donations);
  const requestCounts = countByBloodGroup(requests, "blood_group");

  const chartData = [
    {
      bloodType: "A+",
      donars: donationCounts["A+"],
      requested: requestCounts["A+"],
    },
    {
      bloodType: "A-",
      donars: donationCounts["A-"],
      requested: requestCounts["A-"],
    },
    {
      bloodType: "B+",
      donars: donationCounts["B+"],
      requested: requestCounts["B+"],
    },
    {
      bloodType: "B-",
      donars: donationCounts["B-"],
      requested: requestCounts["B-"],
    },
    {
      bloodType: "O+",
      donars: donationCounts["O+"],
      requested: requestCounts["O+"],
    },
    {
      bloodType: "O-",
      donars: donationCounts["O-"],
      requested: requestCounts["O-"],
    },
    {
      bloodType: "AB+",
      donars: donationCounts["AB+"],
      requested: requestCounts["AB+"],
    },
    {
      bloodType: "AB-",
      donars: donationCounts["AB-"],
      requested: requestCounts["AB-"],
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{`Blood Type: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
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
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bloodType" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {/* Available bars – single color (e.g., blue) */}
          <Bar
            dataKey="donars"
            name={name1}
            fill="#8884d8" // Solid color for all available bars
            radius={[4, 4, 0, 0]}
          />
          {/* Requested bars – single color (e.g., green) */}
          <Bar
            dataKey="requested"
            name={name2}
            fill="#82ca9d" // Solid color for all requested bars
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodTypeBarChart;
