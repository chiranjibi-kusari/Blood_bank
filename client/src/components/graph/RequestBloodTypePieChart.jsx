//// components/graph/RequestBloodTypePieChart.jsx
//import React from "react";
//import {
//  PieChart,
//  Pie,
//  Cell,
//  Tooltip,
//  Legend,
//  ResponsiveContainer,
//} from "recharts";

//const RequestBloodTypePieChart = ({
//  requestData,
//  title = "Requested Blood Types",
//  name,
//}) => {
//  // Prepare data for pie chart
//  const chartData = [
//    { name: "A+", value: requestData?.pagination?.totalAPositive || 0 },
//    { name: "A-", value: requestData?.pagination?.totalANegative || 0 },
//    { name: "B+", value: requestData?.pagination?.totalBPositive || 0 },
//    { name: "B-", value: requestData?.pagination?.totalBNegative || 0 },
//    { name: "O+", value: requestData?.pagination?.totalOPositive || 0 },
//    { name: "O-", value: requestData?.pagination?.totalONegative || 0 },
//    { name: "AB+", value: requestData?.pagination?.totalABPositive || 0 },
//    { name: "AB-", value: requestData?.pagination?.totalABNegative || 0 },
//  ];

//  // Colors for each blood type
//  const COLORS = [
//    "#8884d8", // A+
//    "#82ca9d", // A-
//    "#ffc658", // B+
//    "#ff7300", // B-
//    "#387908", // O+
//    "#000000", // O-
//    "#ff0000", // AB+
//    "#00ffff", // AB-
//  ];

//  // Custom Tooltip
//  const CustomTooltip = ({ active, payload }) => {
//    if (active && payload && payload.length) {
//      const data = payload[0].payload;
//      const percentage = (
//        (data.value / chartData.reduce((sum, item) => sum + item.value, 0)) *
//        100
//      ).toFixed(1);

//      return (
//        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
//          <p className="font-semibold">{`${data.name}`}</p>
//          <p className="text-gray-700">{`${name}: ${data.value}`}</p>
//          <p className="text-gray-600 text-sm">{`${percentage}% of total`}</p>
//        </div>
//      );
//    }
//    return null;
//  };

//  // Calculate total requests
//  const totalRequests = chartData.reduce((sum, item) => sum + item.value, 0);

//  return (
//    <div className="bg-white p-6 rounded-lg shadow-md">
//      <div className="flex justify-between items-center mb-4">
//        <h3 className="text-lg font-semibold">{title}</h3>
//      </div>

//      <div className="flex flex-col lg:flex-row items-center">
//        {/* Pie Chart */}
//        <div className="lg:w-1/2">
//          <ResponsiveContainer width="100%" height={350}>
//            <PieChart>
//              <Pie
//                data={chartData}
//                cx="50%"
//                cy="50%"
//                labelLine={true}
//                label={({ name, percent }) =>
//                  `${name}: ${(percent * 100).toFixed(1)}%`
//                }
//                outerRadius={120}
//                fill="#8884d8"
//                dataKey="value"
//              >
//                {chartData.map((entry, index) => (
//                  <Cell
//                    key={`cell-${index}`}
//                    fill={COLORS[index % COLORS.length]}
//                  />
//                ))}
//              </Pie>
//              <Tooltip content={<CustomTooltip />} />
//              <Legend />
//            </PieChart>
//          </ResponsiveContainer>
//        </div>

//        {/* Legend Details */}
//        <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-8">
//          <div className="grid grid-cols-2 gap-4">
//            {chartData.map((item, index) => {
//              const percentage =
//                totalRequests > 0
//                  ? ((item.value / totalRequests) * 100).toFixed(1)
//                  : 0;

//              return (
//                <div
//                  key={item.name}
//                  className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
//                >
//                  <div
//                    className="w-4 h-4 rounded mr-3"
//                    style={{ backgroundColor: COLORS[index] }}
//                  ></div>
//                  <div className="flex-1">
//                    <div className="flex justify-between items-center">
//                      <span className="font-medium">{item.name}</span>
//                      <span className="font-bold">{item.value}</span>
//                    </div>
//                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                      <div
//                        className="h-2 rounded-full"
//                        style={{
//                          width: `${percentage}%`,
//                          backgroundColor: COLORS[index],
//                        }}
//                      ></div>
//                    </div>
//                    <div className="text-xs text-gray-500 mt-1">
//                      {percentage}% of total
//                    </div>
//                  </div>
//                </div>
//              );
//            })}
//          </div>
//        </div>
//      </div>
//    </div>
//  );
//};

//export default RequestBloodTypePieChart;

// components/graph/RequestBloodTypePieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

const RequestBloodTypePieChart = ({ requestData, title, name }) => {
  // For donations: requestData is the whole donation object { donors, count }
  // For requests: requestData is the whole request object { match_requests, count }
  // This component is used twice in the dashboard – once for donations, once for requests.
  // We need to handle both cases.
  let items = [];
  if (requestData?.donors) items = requestData.donors;
  else if (requestData?.match_requests) items = requestData.match_requests;
  else items = requestData || []; // fallback if raw array is passed

  const counts = countByBloodGroup(items);

  const chartData = [
    { name: "A+", value: counts["A+"] },
    { name: "A-", value: counts["A-"] },
    { name: "B+", value: counts["B+"] },
    { name: "B-", value: counts["B-"] },
    { name: "O+", value: counts["O+"] },
    { name: "O-", value: counts["O-"] },
    { name: "AB+", value: counts["AB+"] },
    { name: "AB-", value: counts["AB-"] },
  ].filter((item) => item.value > 0); // hide zero slices if desired

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#387908",
    "#000000",
    "#ff0000",
    "#00ffff",
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage =
        total > 0 ? ((data.value / total) * 100).toFixed(1) : 0;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-gray-700">{`${name}: ${data.value}`}</p>
          <p className="text-gray-600 text-sm">{`${percentage}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-8">
          <div className="grid grid-cols-2 gap-4">
            {chartData.map((item, index) => {
              const percentage =
                total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
              return (
                <div
                  key={item.name}
                  className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: COLORS[index],
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {percentage}% of total
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBloodTypePieChart;
