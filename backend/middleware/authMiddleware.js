const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const token =
    req.cookies.token ||
    req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Token is not valid" });
  }
}

module.exports = isAuthenticated;
