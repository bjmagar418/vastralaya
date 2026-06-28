
import statsService from "../services/statsService.js";

/**
 * GET /user-stats/:email
 */
const getUserStats = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const stats = await statsService.getUserStatsByEmail(email);
    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);

    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Internal server error fetching user stats",
      error: error.message,
    });
  }
};

/**
 * GET /admin-stats
 */
const getAdminStats = async (req, res) => {
  try {
    const stats = await statsService.getAdminStats();
    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res
      .status(500)
      .json({ message: "Error fetching admin stats", error: error.message });
  }
};

/**
 * GET /merchant-stats
 */
const getMerchantStats = async (req, res) => {
  try {
    const { merchantId } = req.query;

    if (!merchantId) {
      return res
        .status(400)
        .json({ message: "merchantId query parameter is required" });
    }

    const stats = await statsService.getMerchantStats(merchantId);
    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching merchant stats:", error);
    return res
      .status(500)
      .json({ message: "Error fetching merchant stats", error: error.message });
  }
};

export default {
  getUserStats,
  getAdminStats,
  getMerchantStats,
};
