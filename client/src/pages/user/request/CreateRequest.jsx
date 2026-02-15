//import React, { useState } from "react";
//import { useCreateRequest } from "../../../components/hooks/useCreateRequest";

//const CreateRequest = ({ onSuccess, onClose }) => {
//  const {
//    mutate: createRequest,
//    isLoading,
//    error: mutationError,
//  } = useCreateRequest();

//  const [error, setError] = useState("");
//  const [success, setSuccess] = useState("");
//  const [matchedDonors, setMatchedDonors] = useState([]);

//  const [formData, setFormData] = useState({
//    address: "",
//    blood_group: "",
//    units: "",
//    urgency: "medium",
//    hospital_name: "",
//    patient_name: "",
//    patient_age: "",
//    request_date: "",
//  });

//  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
//  const urgencyLevels = [
//    {
//      value: "high",
//      label: "High",
//      color: "bg-red-500",
//    },
//    {
//      value: "medium",
//      label: "Medium",
//      color: "bg-yellow-500",
//    },
//    {
//      value: "low",
//      label: "Low",
//      color: "bg-green-500",
//    },
//  ];

//  const handleChange = (e) => {
//    const { name, value } = e.target;
//    setFormData((prev) => ({
//      ...prev,
//      [name]:
//        name === "units" || name === "patient_age"
//          ? parseInt(value) || ""
//          : value,
//    }));
//    setError("");
//    setSuccess("");
//  };

//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    setError("");
//    setSuccess("");

//    // Validation
//    if (!formData.address.trim()) {
//      setError("Please enter hospital address");
//      return;
//    }

//    if (!formData.blood_group) {
//      setError("Please select required blood group");
//      return;
//    }
//    if (!formData.request_date) {
//      setError("Please select required date");
//      return;
//    }

//    if (formData.units < 1 || formData.units > 10) {
//      setError("Units must be between 1 and 10");
//      return;
//    }

//    if (
//      formData.patient_age &&
//      (formData.patient_age < 0 || formData.patient_age > 120)
//    ) {
//      setError("Patient age must be between 0 and 120");
//      return;
//    }

//    // Use the mutate function from useMutation
//    createRequest(formData, {
//      onSuccess: (data) => {
//        if (data?.success) {
//          setSuccess("Blood request submitted successfully!");

//          // Clear the form
//          setFormData({
//            address: "",
//            blood_group: "",
//            units: 1,
//            urgency: "medium",
//            hospital_name: "",
//            patient_name: "",
//            patient_age: "",
//            request_date: "",
//          });

//          // Call parent's onSuccess after 1.5 seconds
//          setTimeout(() => {
//            if (onSuccess) {
//              onSuccess();
//            }
//          }, 1500);
//        } else {
//          setError(data?.msg || "Failed to create request");
//        }
//      },
//      onError: (err) => {
//        const errorMessage =
//          err?.response?.data?.message ||
//          err?.response?.data?.error ||
//          err?.message ||
//          "An error occurred while submitting the request";
//        setError(errorMessage);
//      },
//    });
//  };

//  // Display mutation error if it exists
//  const displayError = error || mutationError?.message;

//  // Function to manually clear messages
//  const clearMessages = () => {
//    setError("");
//    setSuccess("");
//  };

//  return (
//    <div className="py-6">
//      {/* Success Message - Only show if we're not closing immediately */}
//      {success && !onSuccess && (
//        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r relative">
//          <button
//            onClick={clearMessages}
//            className="absolute top-3 right-3 text-green-600 hover:text-green-800"
//          >
//            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//              <path
//                fillRule="evenodd"
//                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                clipRule="evenodd"
//              />
//            </svg>
//          </button>
//          <div className="flex items-center">
//            <div className="flex-shrink-0">
//              <svg
//                className="h-5 w-5 text-green-500"
//                fill="currentColor"
//                viewBox="0 0 20 20"
//              >
//                <path
//                  fillRule="evenodd"
//                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                  clipRule="evenodd"
//                />
//              </svg>
//            </div>
//            <div className="ml-3">
//              <p className="text-sm text-green-700">{success}</p>
//            </div>
//          </div>
//        </div>
//      )}

//      {/* Error Message */}
//      {displayError && (
//        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r relative">
//          <button
//            onClick={clearMessages}
//            className="absolute top-3 right-3 text-red-600 hover:text-red-800"
//          >
//            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//              <path
//                fillRule="evenodd"
//                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                clipRule="evenodd"
//              />
//            </svg>
//          </button>
//          <div className="flex items-center">
//            <div className="flex-shrink-0">
//              <svg
//                className="h-5 w-5 text-red-500"
//                fill="currentColor"
//                viewBox="0 0 20 20"
//              >
//                <path
//                  fillRule="evenodd"
//                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                  clipRule="evenodd"
//                />
//              </svg>
//            </div>
//            <div className="ml-3">
//              <p className="text-sm text-red-700">{displayError}</p>
//            </div>
//          </div>
//        </div>
//      )}

//      {/* Rest of your form */}
//      <div className="bg-white rounded-xl shadow-md overflow-hidden">
//        <div className="px-6 py-1">
//          <div className="flex items-center mb-6">
//            <div className="flex-shrink-0">
//              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                <svg
//                  className="w-5 h-5 text-blue-600"
//                  fill="none"
//                  stroke="currentColor"
//                  viewBox="0 0 24 24"
//                  xmlns="http://www.w3.org/2000/svg"
//                >
//                  <path
//                    strokeLinecap="round"
//                    strokeLinejoin="round"
//                    strokeWidth="2"
//                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                  />
//                </svg>
//              </div>
//            </div>
//            <div className="ml-3">
//              <h2 className="text-xl font-bold text-gray-900">
//                Blood Request Information
//              </h2>
//              <p className="text-gray-600 text-sm">
//                Fill out all required information for the blood request
//              </p>
//            </div>
//          </div>

//          <form onSubmit={handleSubmit}>
//            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//              {/* Left Column */}
//              <div className="space-y-4">
//                {/* Blood Group Selection */}
//                <div>
//                  <label className="block text-sm font-medium text-gray-700 mb-2">
//                    Required Blood Group <span className="text-red-500">*</span>
//                  </label>
//                  <div className="grid grid-cols-2 gap-3">
//                    {bloodGroups.map((group) => (
//                      <button
//                        key={group}
//                        type="button"
//                        onClick={() =>
//                          setFormData((prev) => ({
//                            ...prev,
//                            blood_group: group,
//                          }))
//                        }
//                        className={`px-2 py-1 rounded-lg border-2 text-center transition-all duration-200 ${
//                          formData.blood_group === group
//                            ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
//                            : "border-gray-300 hover:border-blue-300 hover:bg-blue-50 text-gray-700"
//                        }`}
//                      >
//                        {group}
//                      </button>
//                    ))}
//                  </div>
//                </div>

//                {/* Units Input */}
//                <div>
//                  <label className="block text-sm font-medium text-gray-700 mb-2">
//                    Units Required <span className="text-red-500">*</span>
//                  </label>
//                  <div className="relative">
//                    <input
//                      type="number"
//                      name="units"
//                      max="10"
//                      value={formData.units}
//                      onChange={handleChange}
//                      className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                      required
//                    />
//                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                      <span className="text-gray-500 text-sm">units</span>
//                    </div>
//                  </div>
//                </div>

//                {/* Urgency Selection */}
//                <div>
//                  <label className="block text-sm font-medium text-gray-700 mb-2">
//                    Urgency Level <span className="text-red-500">*</span>
//                  </label>
//                  <div className="space-y-2">
//                    {urgencyLevels.map((level) => (
//                      <div
//                        key={level.value}
//                        className={`flex items-center px-3 py-1.5 border-2 rounded-lg cursor-pointer transition-all ${
//                          formData.urgency === level.value
//                            ? "border-blue-500 bg-blue-50"
//                            : "border-gray-200 hover:border-blue-200"
//                        }`}
//                        onClick={() =>
//                          setFormData((prev) => ({
//                            ...prev,
//                            urgency: level.value,
//                          }))
//                        }
//                      >
//                        <div
//                          className={`w-3 h-3 rounded-full border-2 ${
//                            formData.urgency === level.value
//                              ? "border-blue-500 bg-blue-500"
//                              : "border-gray-300"
//                          }`}
//                        ></div>
//                        <div className="ml-2">
//                          <div className="flex items-center">
//                            <div
//                              className={`w-2 h-2 rounded-full ${level.color} mr-2`}
//                            ></div>
//                            <span className="font-medium text-sm">
//                              {level.label} Priority
//                            </span>
//                          </div>
//                        </div>
//                      </div>
//                    ))}
//                  </div>
//                </div>
//              </div>

//              {/* Right Column */}
//              <div className="space-y-6">
//                {/* Hospital Information */}
//                <div>
//                  <label className="block text-sm font-medium text-gray-700 mb-2">
//                    Hospital Information
//                  </label>
//                  <div className="space-y-4">
//                    <input
//                      type="text"
//                      name="hospital_name"
//                      value={formData.hospital_name}
//                      onChange={handleChange}
//                      placeholder="Hospital Name"
//                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                    />

//                    <input
//                      name="address"
//                      value={formData.address}
//                      onChange={handleChange}
//                      rows="3"
//                      placeholder="Hospital Full Address (required)"
//                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
//                      required
//                    />
//                  </div>
//                </div>

//                {/* Patient Information */}
//                <div>
//                  <label className="block text-sm font-medium text-gray-700 mb-2">
//                    Patient Information
//                  </label>
//                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                    <div>
//                      <input
//                        type="text"
//                        name="patient_name"
//                        value={formData.patient_name}
//                        onChange={handleChange}
//                        placeholder="Patient Name"
//                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                      />
//                    </div>
//                    <div>
//                      <input
//                        type="number"
//                        name="patient_age"
//                        value={formData.patient_age}
//                        onChange={handleChange}
//                        placeholder="Age"
//                        min="0"
//                        max="120"
//                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                      />
//                    </div>
//                  </div>
//                </div>
//                <div>
//                  <label className="block text-sm font-medium text-gray-700 mb-2">
//                    Need Date <span className="text-red-500">*</span>
//                  </label>
//                  <input
//                    type="date"
//                    name="request_date"
//                    value={formData.request_date}
//                    onChange={handleChange}
//                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
//                    required
//                  />
//                  <p className="mt-1 text-sm text-gray-500">
//                    Select the date when you donated blood
//                  </p>
//                </div>

//                {/* Important Notes */}
//                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//                  <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center">
//                    <svg
//                      className="w-4 h-4 mr-2"
//                      fill="currentColor"
//                      viewBox="0 0 20 20"
//                    >
//                      <path
//                        fillRule="evenodd"
//                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                        clipRule="evenodd"
//                      />
//                    </svg>
//                    Important Information
//                  </h3>
//                  <ul className="text-xs text-yellow-700 space-y-1">
//                    <li className="flex items-start">
//                      <span className="mr-1">•</span>
//                      <span>
//                        Please provide accurate hospital address for donor
//                        coordination
//                      </span>
//                    </li>
//                    <li className="flex items-start">
//                      <span className="mr-1">•</span>
//                      <span>
//                        Emergency requests will be prioritized and matched
//                        immediately
//                      </span>
//                    </li>
//                    <li className="flex items-start">
//                      <span className="mr-1">•</span>
//                      <span>
//                        Our system will notify nearby donors based on your
//                        location
//                      </span>
//                    </li>
//                  </ul>
//                </div>
//              </div>
//            </div>

//            {/* Submit Button */}
//            <div className="mt-8 pt-6 border-t border-gray-200">
//              <button
//                type="submit"
//                disabled={isLoading}
//                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
//                  isLoading
//                    ? "bg-gray-400 cursor-not-allowed"
//                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                } text-white shadow-md hover:shadow-lg`}
//              >
//                {isLoading ? (
//                  <div className="flex items-center justify-center">
//                    <svg
//                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                      xmlns="http://www.w3.org/2000/svg"
//                      fill="none"
//                      viewBox="0 0 24 24"
//                    >
//                      <circle
//                        className="opacity-25"
//                        cx="12"
//                        cy="12"
//                        r="10"
//                        stroke="currentColor"
//                        strokeWidth="4"
//                      ></circle>
//                      <path
//                        className="opacity-75"
//                        fill="currentColor"
//                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                      ></path>
//                    </svg>
//                    Submitting Request...
//                  </div>
//                ) : (
//                  <div className="flex items-center justify-center">
//                    <svg
//                      className="w-5 h-5 mr-2"
//                      fill="none"
//                      stroke="currentColor"
//                      viewBox="0 0 24 24"
//                      xmlns="http://www.w3.org/2000/svg"
//                    >
//                      <path
//                        strokeLinecap="round"
//                        strokeLinejoin="round"
//                        strokeWidth="2"
//                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                      />
//                    </svg>
//                    Submit Blood Request
//                  </div>
//                )}
//              </button>
//            </div>
//          </form>
//        </div>
//      </div>
//    </div>
//  );
//};

//export default CreateRequest;

//import React, { useState } from "react";
//import axios from "axios";
//import { useMutation } from "@tanstack/react-query";

//const CreateRequest = () => {
//  /* ============================
//     React Query Mutation
//  ============================ */
//  const createMatchRequest = async (data) => {
//    const res = await axios.post("http://localhost:8000/match", data);
//    return res.data;
//  };

//  const { mutate, isLoading } = useMutation({
//    mutationFn: createMatchRequest,
//  });

//  /* ============================
//     State
//  ============================ */
//  const [formData, setFormData] = useState({
//    blood_group: "",
//    units: 1,
//    urgency_level: "medium",
//    hospital: "",
//    city: "",
//    patient_name: "",
//    patient_age: "",
//    request_date: "",
//  });

//  const [matchedDonors, setMatchedDonors] = useState([]);
//  const [error, setError] = useState("");
//  const [success, setSuccess] = useState("");

//  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

//  /* ============================
//     Handlers
//  ============================ */
//  const handleChange = (e) => {
//    const { name, value } = e.target;
//    setFormData((prev) => ({
//      ...prev,
//      [name]:
//        name === "units" || name === "patient_age" ? Number(value) : value,
//    }));
//  };

//  const handleSubmit = (e) => {
//    e.preventDefault();
//    setError("");
//    setSuccess("");

//    mutate(formData, {
//      onSuccess: (data) => {
//        setSuccess(data.message || "Request submitted successfully");
//        setMatchedDonors(data.matchedDonors || []);
//      },
//      onError: (err) => {
//        setError(
//          err?.response?.data?.message ||
//            err?.response?.data?.error ||
//            "Failed to submit request",
//        );
//      },
//    });
//  };

//  /* ============================
//     UI
//  ============================ */
//  return (
//    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
//      <h2 className="text-xl font-bold mb-4">Create Blood Request</h2>

//      {success && <p className="text-green-600 mb-2">{success}</p>}
//      {error && <p className="text-red-600 mb-2">{error}</p>}

//      <form onSubmit={handleSubmit} className="space-y-3">
//        {/* Blood Group */}
//        <select
//          name="blood_group"
//          value={formData.blood_group}
//          onChange={handleChange}
//          className="w-full border p-2 rounded"
//          required
//        >
//          <option value="">Select Blood Group</option>
//          {bloodGroups.map((bg) => (
//            <option key={bg} value={bg}>
//              {bg}
//            </option>
//          ))}
//        </select>

//        {/* Units */}
//        <input
//          type="number"
//          name="units"
//          min="1"
//          max="10"
//          value={formData.units}
//          onChange={handleChange}
//          className="w-full border p-2 rounded"
//        />

//        {/* Urgency */}
//        <select
//          name="urgency_level"
//          value={formData.urgency_level}
//          onChange={handleChange}
//          className="w-full border p-2 rounded"
//        >
//          <option value="high">High</option>
//          <option value="medium">Medium</option>
//          <option value="low">Low</option>
//        </select>

//        {/* Hospital */}
//        <input
//          type="text"
//          name="hospital"
//          placeholder="Hospital Name"
//          value={formData.hospital}
//          onChange={handleChange}
//          className="w-full border p-2 rounded"
//        />

//        {/* Address */}
//        <textarea
//          name="city"
//          placeholder="Hospital Address"
//          value={formData.city}
//          onChange={handleChange}
//          className="w-full border p-2 rounded"
//          required
//        />

//        {/* Request Date */}
//        <input
//          type="date"
//          name="request_date"
//          value={formData.request_date}
//          onChange={handleChange}
//          className="w-full border p-2 rounded"
//          required
//        />

//        <button
//          type="submit"
//          disabled={isLoading}
//          className="w-full bg-blue-600 text-white py-2 rounded"
//        >
//          {isLoading ? "Submitting..." : "Submit Request"}
//        </button>
//      </form>

//      {/* ============================
//         Matched Donors
//      ============================ */}
//      {matchedDonors.length > 0 && (
//        <div className="mt-6">
//          <h3 className="font-semibold mb-2">Matched Donors</h3>
//          <ul className="space-y-2">
//            {matchedDonors.map((donor) => (
//              <li
//                key={donor.donation_id}
//                className="border p-3 rounded flex justify-between"
//              >
//                <div>
//                  <p className="font-medium">{donor.name}</p>
//                  <p className="text-sm text-gray-500">
//                    Blood: {donor.blood_group} | Units: {donor.units}
//                  </p>
//                </div>
//                <span className="text-sm text-gray-400">
//                  {donor.distance_km
//                    ? `${donor.distance_km.toFixed(2)} km`
//                    : "N/A"}
//                </span>
//              </li>
//            ))}
//          </ul>
//        </div>
//      )}
//    </div>
//  );
//};

//export default CreateRequest;

import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import MatchingResults from "../MatchingResults";

const CreateRequest = () => {
  const createMatchRequest = async (data) => {
    const res = await axios.post("http://localhost:8000/match", data);
    return res.data;
  };

  const { mutate, isLoading } = useMutation({ mutationFn: createMatchRequest });

  const [formData, setFormData] = useState({
    blood_group: "",
    units: 1,
    urgency_level: 3,
    hospital: "",
    city: "",
    address: "",
    patient_name: "",
    patient_age: "",
    request_date: "",
  });

  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "units" || name === "patient_age" || name === "urgency_level"
          ? Number(value)
          : value,
    }));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setError("");
    setSuccess("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
              params: {
                format: "json",
                lat,
                lon,
              },
            },
          );

          const data = res.data;

          setFormData((prev) => ({
            ...prev,
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "",
            address: data.display_name || "",
          }));
        } catch (err) {
          setError("Failed to fetch address from location");
        }
      },
      () => {
        setError("Location permission denied");
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const requiredFields = [
      "blood_group",
      "hospital",
      "city",
      "address",
      "request_date",
      "urgency_level",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Missing required field: ${field}`);
        return;
      }
    }

    // in onSuccess
    mutate(formData, {
      onSuccess: (data) => {
        setSuccess(data.message || "Request submitted successfully");

        // Always show popup, even if no matches
        setMatches(data.matches || []);
        setShowPopup(true);
      },
      onError: (err) => {
        setError(err?.response?.data?.error || "Failed to submit request");
        setShowPopup(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🩸 Create Blood Request
        </h2>

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Blood Group
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
              required
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Units & Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Units Required
              </label>
              <input
                type="number"
                name="units"
                min="1"
                max="10"
                value={formData.units}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Urgency Level
              </label>
              <select
                name="urgency_level"
                value={formData.urgency_level}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
              >
                <option value={5}>High</option>
                <option value={3}>Medium</option>
                <option value={1}>Low</option>
              </select>
            </div>
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospital"
              placeholder="e.g. City Hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* City */}
          {/*<div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Kathmandu"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>*/}

          {/* Address */}
          {/*<div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Hospital Address
            </label>
            <input
              name="address"
              placeholder="Full hospital address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              rows={3}
            />
          </div>*/}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Hospital Address
            </label>

            <div className="flex gap-2">
              <input
                name="address"
                placeholder="Full hospital address"
                value={formData.address}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
              >
                📍 Use
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Kathmandu"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Request Date
            </label>
            <input
              type="date"
              name="request_date"
              value={formData.request_date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {/* Popup for matched donors */}
        {showPopup && (
          <MatchingResults
            matches={matches}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CreateRequest;
