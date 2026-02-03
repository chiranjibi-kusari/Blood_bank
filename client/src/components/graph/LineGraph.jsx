// components/DonationBarChart.jsx
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
  Cell,
} from "recharts";
import { useDonationChartData } from "../hooks/useDonation";

// Color palette for bars
const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

const LineGraph = ({ userId, litersPerUnit = 0.5, showLabels = false }) => {
  const { data, isLoading, error } = useDonationChartData(userId, {
    litersPerUnit,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-pulse space-y-4 w-full">
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="h-56 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">
          Error loading donation data
        </div>
        <div className="text-gray-500 text-sm">Please try again later</div>
      </div>
    );
  }

  const chartData = data?.data || [];
  const summary = data?.summary || {};

  if (chartData.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="text-gray-500 text-lg mb-2">
          No donation history available
        </div>
        <div className="text-gray-400">
          Start donating to see your history visualized
        </div>
      </div>
    );
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
          <div className="font-semibold text-gray-800 mb-2">
            {data.fullDate}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Blood Donated:</span>
              <span className="font-semibold text-red-600">
                {data.liters} liters
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Units:</span>
              <span className="font-semibold">{data.units} bags</span>
            </div>
            {data.blood_group && (
              <div className="flex justify-between">
                <span className="text-gray-600">Blood Group:</span>
                <span className="font-semibold">{data.blood_group}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Blood Donation Timeline
        </h3>
        <p className="text-gray-600">
          Visual representation of your blood donations over time
        </p>
      </div>

      {/* Bar Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
            barSize={40}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
              interval={Math.ceil(chartData.length / 10)} // Show fewer labels for many data points
            />
            <YAxis
              label={{
                value: "Liters",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle" },
              }}
              tickFormatter={(value) => `${value}L`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              name="Blood Donated (Liters)"
              dataKey="liters"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  stroke="#fff"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-red-600 font-medium">
                  Total Donations
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {summary.totalDonations || chartData.length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100  p-8 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-blue-600 font-medium">
                  Total Units
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {summary.totalUnits || 0}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-green-600 font-medium">
                  Total Blood
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {summary.totalLiters || "0.00"}L
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
    </div>
  );
};

export default LineGraph;
