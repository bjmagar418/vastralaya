import axios from "axios";

export const fetchDashboard = async () => {
  try {
    const res = await axios.get("http://localhost:5005/api/dashboard");
    return res.data;
  } catch (error) {
    console.log("Dashboard API error:", error);
    throw error;
  }
};