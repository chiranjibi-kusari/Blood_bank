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

const MatchingResults = ({ matches, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4">Matched Donors</h3>

        {matches && matches.length > 0 ? (
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {matches.map((match) => {
              const donor = match.donor;
              return (
                <li
                  key={donor.id}
                  className="border p-3 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{donor.name}</p>
                    <p className="text-sm text-gray-500">
                      Blood: {donor.blood_group} | Phone: {donor.phone} | City: {donor.city}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last Donation: {donor.last_donation_date}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400 mt-2 sm:mt-0 text-right">
                    <p>Distance: {match.distance_km?.toFixed(2)} km</p>
                    <p>Compatibility: {(match.compatibility_score * 100).toFixed(0)}%</p>
                    <p>AI Score: {(match.ai_match_score * 100).toFixed(0)}%</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-600 text-center py-10">No matched donors found.</p>
        )}
      </div>
    </div>
  );
};

export default MatchingResults;
