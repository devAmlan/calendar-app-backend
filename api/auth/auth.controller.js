const router = require("express").Router();
const { OAuth2Client } = require("google-auth-library");
const config = require("../../config/config");

router.post("/login/google", async (req, res, next) => {
  try {
    const { googleClientId } = config;
    const client = new OAuth2Client();
  } catch (error) {}
});

module.exports = router;
