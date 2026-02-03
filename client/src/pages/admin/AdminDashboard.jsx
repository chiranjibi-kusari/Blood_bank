import React from "react";
import Card from "../../components/reusable/Card";
import { useGetDonation } from "../../components/hooks/useDonation";
import { FaUsers, FaDonate, FaHandHoldingHeart } from "react-icons/fa";
import { useGetUserList } from "../../components/hooks/useUser";
import { useGetRequest } from "../../components/hooks/useRequest";
import BloodTypeBarChart from "../../components/graph/BloodTypeBarChart";
import BloodTypeBarChartSingle from "../../components/graph/BloodTypeBarChartSingle";
import RequestBloodTypePieChart from "../../components/graph/RequestBloodTypePieChart";

const AdminDashboard = () => {
  const {
    data: donationData,
    isLoading: donationLoading,
    error: donationError,
  } = useGetDonation();

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserList();

  const {
    data: requestData,
    isLoading: requestLoading,
    error: requestError,
  } = useGetRequest();

  // Handle loading states
  if (donationLoading || userLoading) {
    return (
      <div className="px-10 flex items-center justify-center h-64">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  // Handle errors
  if (donationError || userError) {
    return (
      <div className="px-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  // Use optional chaining and provide fallback values
  const totalDonations = donationData?.pagination?.totalItems || 0;
  const totalUsers = userData?.pagination?.totalItems || 0;
  const totalRequests = requestData?.pagination?.totalItems || 0;

  return (
    <div className="px-10">
      <div>
        <h1 className="text-3xl font-semibold pb-1">Admin Dashboard</h1>
        <p className="pb-6">See the summary of the admin</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Card
          name="Total Users"
          icon={<FaUsers className="text-2xl" />}
          total={totalUsers}
          bg="bg-gradient-to-r from-blue-900 to-cyan-500"
        />
        <Card
          name="Total Donations"
          icon={<FaDonate className="text-2xl" />}
          total={totalDonations}
          bg="bg-gradient-to-r from-green-900 to-cyan-500"
        />
        <Card
          name="Total Requests"
          icon={<FaHandHoldingHeart className="text-2xl" />}
          total={totalRequests}
          bg="bg-gradient-to-r from-sky-500 to-cyan-500"
        />
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-6">
          <BloodTypeBarChart
            donationData={donationData}
            requestData={requestData}
            title="Blood Type Availability vs Requests"
            name1={"Available"}
            name2={"Requested"}
          />
          {/*<BloodTypeBarChartSingle
            donationData={donationData}
            title="Blood Type Availability"
          />*/}
          <RequestBloodTypePieChart
            requestData={donationData}
            title="Blood Type Availability"
            name={"Available"}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="mb-20">
          <RequestBloodTypePieChart
            requestData={requestData}
            title="Request Blood Types"
            name={"Requests"}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
