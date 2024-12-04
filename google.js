const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// google oauth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
};

app.post("/api/auth/google-login", async (req, res) => {
  const { token } = req.body;
  try {
    const googleUser = await verifyGoogleToken(token);

    const user = {
      email: googleUser.email,
      name: googleUser.name,
      role: "superadmin",
      organization: null,
    };

    // Create JWT token with user info
    const accessToken = jwt.sign(
      { userId: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: accessToken });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(400).json({ message: "Invalid token" });
  }
});

app.post("/api/org/create", (req, res) => {
  const { organizationName } = req.body;
  const token = req.headers.authorization.split(" ")[1]; // Extract JWT token

  if (!token) return res.status(401).json({ message: "Token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({
      message: `Organization '${organizationName}' created successfully`,
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    res
      .status(400)
      .json({ message: "Invalid token or failed to create organization" });
  }
});

app.get(
  "/secure-route",
  roleBasedAccess(["super admin", "admin"]),
  (req, res) => {
    res.send("You have access to this route!");
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
