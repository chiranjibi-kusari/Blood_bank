import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDonation } from "../../../components/hooks/useCreateDonation";

const CreateDonation = ({ onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    blood_group: "",
    units: "",
    donation_date: "", // Changed from 'date' to 'donation_date' to match backend
  });

  // ✅ CORRECT: Call the hook at the top level to get mutation function
  const { mutate: createDonation, isLoading } = useCreateDonation();

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for units to ensure it's a number
    if (name === "units") {
      const unitValue = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setError("");
    setSuccess("");
  };

  const handleBloodGroupSelect = (group) => {
    setFormData((prev) => ({
      ...prev,
      blood_group: group,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.address.trim()) {
      setError("Please enter an address");
      return;
    }

    if (!formData.blood_group) {
      setError("Please select a blood group");
      return;
    }

    if (!formData.donation_date) {
      setError("Please enter donation date");
      return;
    }

    // Validate date is not in the future
    const selectedDate = new Date(formData.donation_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("Donation date cannot be in the future");
      return;
    }

    if (formData.units < 1 || formData.units > 10) {
      setError("Units must be between 1 and 10");
      return;
    }

    // ✅ CORRECT: Use the mutate function from the hook
    createDonation(formData, {
      onSuccess: (response) => {
        if (response.success) {
          setSuccess("Donation created successfully!");
          setFormData({
            address: "",
            blood_group: "",
            units: "",
            donation_date: today.toISOString().split("T")[0],
          });

          if (onSuccess) {
            onSuccess(response.donation); // Pass the created donation data
          }

          // Optionally close modal after success
          if (onClose) {
            setTimeout(() => onClose(), 2000);
          }
        } else {
          setError(response.msg || "Failed to create donation");
        }
      },
      onError: (err) => {
        setError(err.response?.data?.msg || err.message || "An error occurred");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-extrabold text-red-800 mb-1">
            Donate Blood, Save Lives
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to register your blood donation.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-10">
            <div className="flex items-center mb-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Donation Information
                </h2>
                <p className="text-gray-600">
                  Please provide details about your blood donation
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Blood Group Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {bloodGroups.map((group) => (
                      <button
                        key={group}
                        type="button"
                        onClick={() => handleBloodGroupSelect(group)}
                        className={`px-4 py-1.5 rounded-lg border-2 text-center transition-all duration-200 ${
                          formData.blood_group === group
                            ? "border-red-500 bg-red-50 text-red-700 font-semibold"
                            : "border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700"
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                  {formData.blood_group && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected:{" "}
                      <span className="font-semibold text-red-600">
                        {formData.blood_group}
                      </span>
                    </p>
                  )}
                </div>

                {/* Units Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Units of Blood <span className="text-red-500">*</span>
                    <span className="ml-2 text-gray-500">(1 unit = 450ml)</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        name="units"
                        value={formData.units}
                        onChange={handleChange}
                        className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500">units</span>
                      </div>
                    </div>
                    <div className="w-24">
                      <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 text-center">
                        <span className="text-xl font-bold text-red-600">
                          {formData.units * 450} ml
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Typically 1-2 units per donation
                  </p>
                </div>

                {/* Address Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter the donation center or hospital address"
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Where did you donate blood?
                  </p>
                </div>

                {/* Donation Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="donation_date"
                    value={formData.donation_date}
                    onChange={handleChange}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Select the date when you donated blood
                  </p>
                </div>

                {/* Tips Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Donation Tips
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Drink plenty of water before donating</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Eat a healthy meal before donation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Bring your ID and any required documents</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Rest for 10-15 minutes after donation</span>
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="pt-6 flex gap-4">
                  {onClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2 px-6 rounded-xl text-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 py-2 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5"
                    } text-white shadow-lg hover:shadow-xl`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Submit Donation
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonation;
