const config = require("../config/config");
const jwt = require("jsonwebtoken");
exports.authorize = () => {
  return (req, res, next) => {
    try {
      const token =
        req.headers["Authorization"] || req.headers["authorization"];

      const tokenString = token.split(" ")[1];

      jwt.verify(tokenString, config.secretToken, (err, decodedToken) => {
        if (err) return res.status(400).send("Token invalid");
        if (!decodedToken.role) return res.status(400).send("Role missing");

        req.auth = {
          ...decodedToken,
          _id: decodedToken._id,
          userId: decodedToken._id,
        };
        next();
      });
    } catch (error) {
      console.log(error);
    }
  };
};
