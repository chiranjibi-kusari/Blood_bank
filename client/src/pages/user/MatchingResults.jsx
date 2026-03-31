//import React from "react";

//const MatchingResults = ({ matches, onClose }) => {
//  if (!matches || matches.length === 0) return null;

//  return (
//    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
//        <button
//          onClick={onClose}
//          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
//        >
//          ✕
//        </button>
//        <h3 className="text-xl font-semibold mb-4">
//          Matched Donors ({matches.length})
//        </h3>
//        <ul className="space-y-3 max-h-96 overflow-y-auto">
//          {matches.map((match) => {
//            const donor = match.donor;
//            return (
//              <li
//                key={donor.id}
//                className="border p-3 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50"
//              >
//                <div>
//                  <p className="font-medium">{donor.name}</p>
//                  <p className="text-sm text-gray-500">
//                    Blood: {donor.blood_group} | Phone: {donor.phone} | City: {donor.city}
//                  </p>
//                  <p className="text-sm text-gray-500">
//                    Last Donation: {donor.last_donation_date}
//                  </p>
//                </div>
//                <div className="text-sm text-gray-400 mt-2 sm:mt-0 text-right">
//                  <p>Distance: {match.distance_km?.toFixed(2)} km</p>
//                  <p>Compatibility: {(match.compatibility_score * 100).toFixed(0)}%</p>
//                  <p>AI Score: {(match.ai_match_score * 100).toFixed(0)}%</p>
//                </div>
//              </li>
//            );
//          })}
//        </ul>
//      </div>
//    </div>
//  );
//};

//export default MatchingResults;

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaRegFilePdf } from "react-icons/fa";

const MatchingResults = ({ matches, onClose }) => {
  const downloadPDF = () => {
    if (!matches || matches.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Matched Donors Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    const headers = [["Name", "Blood Group", "Phone", "City", "Last Donation"]];
    const rows = matches.map((match) => {
      const donor = match.donor;
      return [
        donor.name,
        donor.blood_group,
        donor.phone,
        donor.city,
        donor.last_donation_date,
      ];
    });

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 40,
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("matched-donors.pdf");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          ✕
        </button>

        <div className="flex gap-10 items-center mb-4">
          <h3 className="text-xl font-semibold">Matched Donors</h3>
          <button
            onClick={downloadPDF}
            className=" flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            <FaRegFilePdf size={18} />
            Download PDF
          </button>
        </div>

        {matches && matches.length > 0 ? (
          <div className="overflow-x-auto max-h-96 border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#2980B9]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Last Donation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matches.map((match) => {
                  const donor = match.donor;
                  return (
                    <tr key={donor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {donor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donor.blood_group}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donor.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donor.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donor.last_donation_date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center py-10">
            No matched donors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchingResults;
