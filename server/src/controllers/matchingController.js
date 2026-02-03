import { matchDonorsForRequest } from "../services/matchingService.js";

export const matchRequest = async (req, res) => {
  try {
    const matches = await matchDonorsForRequest(req.params.id);
    res.json({
      request_id: req.params.id,
      donors: matches
    });
  } catch (err) {
    res.status(500).json({
      message: "Matching failed",
      error: err.message
    });
  }
};
