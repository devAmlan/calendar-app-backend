const jwt = require("jsonwebtoken");

const roleBasedAccess = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(404).json({
        message: "Access denied, No Token provided",
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decodedToken.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Invalid or expired token", error: error.message });
    }
  };
};

module.exports = roleBasedAccess;
