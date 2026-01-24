import React from "react";

import blood2 from "../../assets/images/blood2.jpg";
const Service = () => {
  return (
    <div className=" py-20 px-5 ">
      <div className="flex justify-between items-center gap-10">
        <div className="px-10">
          <h1 className="pb-6 font-bold text-4xl">Our Service</h1>
          <p className="text-lg">
            The Blood Bank Management System (BBMS) provides a comprehensive set
            of services to ensure efficient blood donation management, safe
            storage, and timely distribution. Our services are designed to
            support blood banks, hospitals, donors, and patients through a
            secure and user-friendly digital platform.
          </p>

          <div className="mt-8">
            <h1 className="pb-1 mt-4 font-bold text-2xl">
              Donor Registration & Management
            </h1>
            <p className="text-lg">
              We provide an easy-to-use donor registration system where
              individuals can sign up, update personal details, track donation
              history, and receive notifications for upcoming donation
              opportunities.
            </p>
            <h1 className="pb-1 mt-4 font-bold text-2xl">
              Blood Inventory Management
            </h1>
            <p className="text-lg">
              The system maintains real-time records of available blood units
              categorized by blood group and Rh factor. It helps prevent
              shortages, overstocking, and wastage due to expired blood.
            </p>
            <h1 className="pb-1 mt-4 font-bold text-2xl">
              Blood Search & Availability Tracking
            </h1>
            <p className="text-lg">
              Hospitals and authorized users can quickly search for required
              blood groups and check availability across blood banks, especially
              during emergencies.
            </p>
            <h1 className="pb-1 mt-4 font-bold text-2xl">
              Blood Donation Scheduling
            </h1>
            <p className="text-lg">
              Donors can book donation appointments online, reducing waiting
              times and improving donation center efficiency.
            </p>
            <h1 className="pb-1 mt-4 font-bold text-2xl">
              Emergency Blood Request Handling
            </h1>
            <p className="text-lg">
              The system enables quick blood requests in critical situations,
              allowing hospitals and patients to connect with blood banks and
              eligible donors immediately.
            </p>

            <h1 className="pb-1 mt-4 font-bold text-2xl">
              Secure Data Management
            </h1>
            <p className="text-lg">
              All donor and patient data is securely stored with proper
              authentication and role-based access control to ensure privacy and
              compliance.
            </p>

            <h1 className="pb-1 mt-4 font-bold text-2xl">
              Admin & User Management
            </h1>
            <p className="text-lg">
              Administrators can manage users, approve donor registrations,
              control access levels, and monitor overall system performance.
            </p>
          </div>
        </div>
        <img src={blood2} alt="blood2" className="w-96 h-auto pr-20 mt-12 " />
      </div>
    </div>
  );
};

export default Service;
