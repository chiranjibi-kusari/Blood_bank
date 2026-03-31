//import React, { useState } from "react";
//import { FaTrash, FaEye, FaUsers } from "react-icons/fa";
//import Card from "../../../components/reusable/Card";
//import { useGetRequest } from "../../../components/hooks/useRequest";
//import RequestBloodTypePieChart from "../../../components/graph/RequestBloodTypePieChart";
//import BloodTypeBarChartSingle from "../../../components/graph/BloodTypeBarChartSingle";

//const Request = () => {
//  const [currentPage, setCurrentPage] = useState(1);
//  const [pageSize, setPageSize] = useState(4);

//  // Fetch users with pagination
//  const { data, isLoading, isError, error } = useGetRequest({
//    page: currentPage,
//    size: pageSize,
//  });

//  // Extract data from response
//  const donations = data?.data || [];
//  const pagination = data?.pagination || {
//    currentPage: 1,
//    pageSize: 10,
//    totalItems: 0,
//    totalPages: 1,
//  };
//  //const deleteUserMutation = useDeleteUser();
//  //const handleDeleteUser = (user) => {
//  //  deleteUserMutation.mutate(user.id);
//  //};
//  // Handle page change
//  const handlePageChange = (page) => {
//    if (page >= 1 && page <= pagination.totalPages) {
//      setCurrentPage(page);
//    }
//  };

//  // Handle page size change
//  const handlePageSizeChange = (e) => {
//    const newSize = parseInt(e.target.value);
//    setPageSize(newSize);
//    setCurrentPage(1);
//  };

//  // Loading state
//  if (isLoading) {
//    return (
//      <div className="flex items-center justify-center min-h-[400px]">
//        <div className="text-center">
//          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//          <p className="mt-4 text-gray-600">Loading users...</p>
//        </div>
//      </div>
//    );
//  }

//  // Error state
//  if (isError) {
//    return (
//      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//        <div className="flex items-center">
//          <svg
//            className="w-6 h-6 text-red-500 mr-3"
//            fill="currentColor"
//            viewBox="0 0 20 20"
//          >
//            <path
//              fillRule="evenodd"
//              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//              clipRule="evenodd"
//            />
//          </svg>
//          <div>
//            <h3 className="text-lg font-semibold text-red-800">
//              Error loading users
//            </h3>
//            <p className="text-red-700 mt-1">
//              {error?.message || "Unable to fetch user data. Please try again."}
//            </p>
//          </div>
//        </div>
//      </div>
//    );
//  }

//  return (
//    <div>
//      {/* Header Section */}
//      <div className="mb-6">
//        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//          Donation Management
//        </h1>
//        <p className="text-gray-600">
//          Manage and view all registered donations in the system
//        </p>
//      </div>
//      <BloodTypeBarChartSingle
//        donationData={data}
//        title="Request Blood Type"
//        name={"Requests"}
//      />

//      {/* Main Content Area with Scrollable Table */}
//      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-10">
//        {/* Table Container with Scroll */}
//        <div className="">
//          {/* Scrollable table wrapper */}
//          <div className="">
//            <table className="w-full divide-y divide-gray-200">
//              <thead className="bg-gray-50 sticky top-0 z-10">
//                <tr>
//                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                    Name
//                  </th>
//                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                    Email
//                  </th>
//                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                    Phone no.
//                  </th>
//                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                    Address
//                  </th>
//                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                    Blood Group
//                  </th>
//                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                    Units
//                  </th>
//                </tr>
//              </thead>
//              <tbody className="bg-white divide-y divide-gray-200">
//                {donations.length > 0 ? (
//                  donations.map((user) => (
//                    <tr
//                      key={user.id}
//                      className="hover:bg-gray-50 transition-colors duration-150"
//                    >
//                      <td className="px-6 py-4 whitespace-nowrap">
//                        <div className="flex items-center">
//                          <div className="">
//                            <div className="text-sm font-medium text-gray-900">
//                              {user.name}
//                            </div>
//                          </div>
//                        </div>
//                      </td>
//                      <td className="px-6 py-4 whitespace-nowrap">
//                        <div className="flex items-center">
//                          <div className="">
//                            <div className="text-sm font-medium text-gray-900">
//                              {user.email}
//                            </div>
//                          </div>
//                        </div>
//                      </td>
//                      <td className="px-6 py-4 whitespace-nowrap">
//                        <div className="flex items-center">
//                          <div className="">
//                            <div className="text-sm font-medium text-gray-900">
//                              {user.phone}
//                            </div>
//                          </div>
//                        </div>
//                      </td>
//                      <td className="px-6 py-4 whitespace-nowrap">
//                        <div className="flex items-center">
//                          <div className="">
//                            <div className="text-sm font-medium text-gray-900">
//                              {user.address}
//                            </div>
//                          </div>
//                        </div>
//                      </td>
//                      <td className="px-6 py-4 whitespace-nowrap">
//                        <div className="flex items-center">
//                          <div className="">
//                            <div className="text-sm font-medium text-gray-900">
//                              {user.blood_group}
//                            </div>
//                          </div>
//                        </div>
//                      </td>
//                      <td className="px-6 py-4 whitespace-nowrap">
//                        <div className="flex items-center">
//                          <div className="">
//                            <div className="text-sm font-medium text-gray-900">
//                              {user.units}
//                            </div>
//                          </div>
//                        </div>
//                      </td>
//                    </tr>
//                  ))
//                ) : (
//                  <tr>
//                    <td colSpan="5" className="px-6 py-12 text-center">
//                      <div className="text-gray-500">
//                        <svg
//                          className="mx-auto h-12 w-12 text-gray-400"
//                          fill="none"
//                          stroke="currentColor"
//                          viewBox="0 0 24 24"
//                        >
//                          <path
//                            strokeLinecap="round"
//                            strokeLinejoin="round"
//                            strokeWidth={2}
//                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 3.75l-.75.75"
//                          />
//                        </svg>
//                        <h3 className="mt-4 text-lg font-medium text-gray-900">
//                          No users found
//                        </h3>
//                      </div>
//                    </td>
//                  </tr>
//                )}
//              </tbody>
//            </table>
//          </div>
//        </div>

//        {/* Pagination */}
//        {pagination.totalPages > 1 && (
//          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//              <div className="text-sm text-gray-700">
//                Showing{" "}
//                <span className="font-medium">
//                  {(currentPage - 1) * pageSize + 1}
//                </span>{" "}
//                to{" "}
//                <span className="font-medium">
//                  {Math.min(currentPage * pageSize, pagination.totalItems)}
//                </span>{" "}
//                of <span className="font-medium">{pagination.totalItems}</span>{" "}
//                users
//              </div>

//              <div className="flex items-center space-x-2">
//                {/* Previous Button */}
//                <button
//                  onClick={() => handlePageChange(currentPage - 1)}
//                  disabled={currentPage === 1}
//                  className={`px-3 py-2 border rounded-lg flex items-center text-sm ${
//                    currentPage === 1
//                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
//                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                  }`}
//                >
//                  <svg
//                    className="w-4 h-4 mr-1"
//                    fill="none"
//                    stroke="currentColor"
//                    viewBox="0 0 24 24"
//                  >
//                    <path
//                      strokeLinecap="round"
//                      strokeLinejoin="round"
//                      strokeWidth={2}
//                      d="M15 19l-7-7 7-7"
//                    />
//                  </svg>
//                  Previous
//                </button>

//                {/* Page Numbers */}
//                <div className="flex items-center space-x-1">
//                  {Array.from(
//                    { length: Math.min(5, pagination.totalPages) },
//                    (_, i) => {
//                      let pageNum;
//                      if (pagination.totalPages <= 5) {
//                        pageNum = i + 1;
//                      } else if (currentPage <= 3) {
//                        pageNum = i + 1;
//                      } else if (currentPage >= pagination.totalPages - 2) {
//                        pageNum = pagination.totalPages - 4 + i;
//                      } else {
//                        pageNum = currentPage - 2 + i;
//                      }

//                      return (
//                        <button
//                          key={pageNum}
//                          onClick={() => handlePageChange(pageNum)}
//                          className={`w-9 h-9 flex items-center justify-center border rounded-lg text-sm ${
//                            currentPage === pageNum
//                              ? "bg-blue-600 text-white border-blue-600"
//                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                          }`}
//                        >
//                          {pageNum}
//                        </button>
//                      );
//                    },
//                  )}

//                  {pagination.totalPages > 5 &&
//                    currentPage < pagination.totalPages - 2 && (
//                      <>
//                        <span className="px-1 text-gray-500">...</span>
//                        <button
//                          onClick={() =>
//                            handlePageChange(pagination.totalPages)
//                          }
//                          className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
//                        >
//                          {pagination.totalPages}
//                        </button>
//                      </>
//                    )}
//                </div>

//                {/* Next Button */}
//                <button
//                  onClick={() => handlePageChange(currentPage + 1)}
//                  disabled={currentPage === pagination.totalPages}
//                  className={`px-3 py-2 border rounded-lg flex items-center text-sm ${
//                    currentPage === pagination.totalPages
//                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
//                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                  }`}
//                >
//                  Next
//                  <svg
//                    className="w-4 h-4 ml-1"
//                    fill="none"
//                    stroke="currentColor"
//                    viewBox="0 0 24 24"
//                  >
//                    <path
//                      strokeLinecap="round"
//                      strokeLinejoin="round"
//                      strokeWidth={2}
//                      d="M9 5l7 7-7 7"
//                    />
//                  </svg>
//                </button>
//              </div>
//            </div>
//          </div>
//        )}
//      </div>
//    </div>
//  );
//};

//export default Request;

import React, { useState, useMemo } from "react";
import { FaTrash, FaEye, FaUsers, FaTimes, FaDonate } from "react-icons/fa";
import Card from "../../../components/reusable/Card";
import { useGetRequest } from "../../../components/hooks/useRequest";
import RequestBloodTypePieChart from "../../../components/graph/RequestBloodTypePieChart";
import BloodTypeBarChartSingle from "../../../components/graph/BloodTypeBarChartSingle";

const Request = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showMatchesModal, setShowMatchesModal] = useState(false);

  // Fetch requests (may be paginated or full list)
  const { data, isLoading, isError, error } = useGetRequest({
    page: currentPage,
    size: pageSize,
  });

  // Determine if backend pagination is present
  const hasBackendPagination = !!data?.pagination;

  // Extract requests array – handle both structures
  const allRequests = data?.match_requests || [];

  // Total count: from `data.count` if available, otherwise length of full list
  const totalRequests = data?.count || allRequests.length;

  // Pagination metadata (either from backend or computed)
  const pagination = data?.pagination || {
    currentPage: 1,
    pageSize: 10,
    totalItems: allRequests.length,
    totalPages: Math.ceil(allRequests.length / pageSize),
  };

  // For client‑side pagination, we need to slice the full array
  const displayedRequests = useMemo(() => {
    if (hasBackendPagination) {
      return allRequests; // backend already gave the correct page
    } else {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      return allRequests.slice(start, end);
    }
  }, [allRequests, currentPage, pageSize, hasBackendPagination]);

  // Handle page change (works for both modes)
  const handlePageChange = (page) => {
    const totalPages = hasBackendPagination
      ? pagination.totalPages
      : Math.ceil(allRequests.length / pageSize);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Open modal with selected request's matches
  const handleViewMatches = (request) => {
    setSelectedRequest(request);
    setShowMatchesModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowMatchesModal(false);
    setSelectedRequest(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-red-500 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-red-800">
              Error loading requests
            </h3>
            <p className="text-red-700 mt-1">
              {error?.message ||
                "Unable to fetch request data. Please try again."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Determine total pages for pagination UI
  const totalPages = hasBackendPagination
    ? pagination.totalPages
    : Math.ceil(allRequests.length / pageSize);

  const totalItems = hasBackendPagination
    ? pagination.totalItems
    : allRequests.length;

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Blood Request Management
        </h1>
        <p className="text-gray-600">
          Manage and view all blood requests with their match results
        </p>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-3">
        <Card
          name="Total Requests"
          icon={<FaDonate className="text-2xl" />}
          total={totalRequests}
          bg="bg-gradient-to-r from-green-900 to-cyan-500"
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-10">
        <div className="">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Blood Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Units
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Urgency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Matches
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedRequests.length > 0 ? (
                displayedRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.blood_group ||
                          request.request_data?.blood_group}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.hospital || request.request_data?.hospital}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.city || request.request_data?.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.request_data?.units || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.urgency_level >= 5
                          ? "High"
                          : request.urgency_level >= 3
                            ? "Medium"
                            : "Low"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.request_data?.request_date ||
                          request.created_at?.split(" ")[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewMatches(request)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                        title="View Matches"
                        disabled={
                          !request.match_results ||
                          request.match_results.length === 0
                        }
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 3.75l-.75.75"
                        />
                      </svg>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">
                        No requests found
                      </h3>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination – show if more than one page */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * pageSize + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, totalItems)}
                </span>{" "}
                of <span className="font-medium">{totalItems}</span> requests
              </div>

              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 border rounded-lg flex items-center text-sm ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 flex items-center justify-center border rounded-lg text-sm ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-1 text-gray-500">...</span>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 border rounded-lg flex items-center text-sm ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Matches Modal (unchanged) */}
      {showMatchesModal && selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* ... modal content (same as before) ... */}
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={handleCloseModal}
            ></div>
            <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Match Results for Request #{selectedRequest.id}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-4 max-h-96 overflow-y-auto">
                {selectedRequest.match_results &&
                selectedRequest.match_results.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Donor Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blood Group
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          City
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        {/*<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Distance (km)
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          AI Score
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Compatibility
                        </th>*/}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedRequest.match_results.map((match, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {match.donor.name}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {match.donor.blood_group}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {match.donor.city}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {match.donor.phone}
                          </td>
                          {/*<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {match.distance_km.toFixed(2)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {match.ai_match_score}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {match.compatibility_score}
                          </td>*/}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No match results available for this request.
                  </p>
                )}
              </div>
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
