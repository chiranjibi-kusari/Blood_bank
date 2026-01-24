import React from "react";

const Register = () => {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Full Name"
        className="border p-2 rounded"
      />
      <input type="email" placeholder="Email" className="border p-2 rounded" />
      <input
        type="text"
        placeholder="Blood Group"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
