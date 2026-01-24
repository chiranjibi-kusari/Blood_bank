import React from "react";

import blood1 from "../../assets/images/blood1.jpg";
const About = () => {
  return (
    <div className=" py-20 px-5 ">
      <div className="flex justify-between items-center gap-10">
        <div className="px-10">
          <h1 className="pb-6 font-bold text-4xl">About Us</h1>
          <p className="text-lg">
            The Blood Bank Management System (BBMS) is a technology-driven
            platform designed to streamline and modernize the process of blood
            donation, storage, and distribution. Our goal is to bridge the gap
            between blood donors, blood banks, hospitals, and patients by
            providing a fast, reliable, and transparent system.
          </p>
          <br />
          <p className="text-lg">
            Blood is a critical life-saving resource, and timely access can make
            the difference between life and death. The BBMS ensures efficient
            management of blood inventory, accurate donor records, and quick
            identification of available blood groups, helping healthcare
            providers respond effectively during emergencies.
          </p>
          <div className="mt-8">
            <h1 className="pb-2 font-bold text-4xl">Our Mission</h1>
            <p className="text-lg">
              To ensure safe, efficient, and timely blood availability by
              leveraging modern information technology and improving
              coordination among donors, blood banks, and healthcare
              institutions.
            </p>
          </div>
          <div className="mt-8">
            <h1 className="pb-2 font-bold text-4xl">Our Vision</h1>
            <p className="text-lg">
              To create a connected blood donation ecosystem where no patient
              suffers due to the unavailability or mismanagement of blood
              resources.
            </p>
          </div>
          <div className="mt-8">
            <h1 className="pb-2 font-bold text-4xl">Key Features</h1>
            <p className="text-lg">- Donor registration and management</p>
            <p className="text-lg">- Real-time blood availability updates</p>
            <p className="text-lg">- Secure data storage and access control</p>
            <p className="text-lg">- Emergency blood request handling</p>
          </div>
        </div>
        <img src={blood1} alt="blood2" className="w-96 h-auto pr-20 mt-12 " />
      </div>
    </div>
  );
};

export default About;
