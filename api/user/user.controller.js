const router = require("express").Router();
const service = require("./user.service");
const { authorize } = require("../../middlewares/auth");

router.get("/profile", authorize(), service.getUserProfile);
router.post("/register", authorize(), service.registerUser);
router.get("/organization", authorize(), service.getOrganization);
router.delete(
  "/remove/:userId",
  authorize(),
  service.removeUserFromOrganization
);
module.exports = router;
