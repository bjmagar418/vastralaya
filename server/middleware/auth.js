import jwt from "../utils/jwt.js";

const auth = (req, res, next) => {
  // DEBUGGING: This log will tell us if cookie-parser is working
  console.log("Cookies received by server:", req.cookies);

  // The '?. ' is the "defensive" part. If req.cookies is undefined,
  // it won't crash the server.
  const token = req.cookies?.authToken;

  if (!token) {
    console.log("No authToken found in cookies.");
    return res
      .status(401)
      .json({ message: "User not authenticated - No token" });
  }

  try {
    const data = jwt.verifyToken(token);
    req.user = data;
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;
