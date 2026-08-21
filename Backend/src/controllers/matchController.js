const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/apiResponse");
const { computeMatches } = require("../services/matchingService");

// GET /api/matches
const getMatches = asyncHandler(async (req, res) => {
  const matches = await computeMatches(req.user.id);
  return success(res, matches);
});

module.exports = { getMatches };
