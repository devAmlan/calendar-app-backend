const router = require("express").Router();
const service = require("./shift.service");
const { authorize } = require("../../middlewares/auth");

router.get("/", authorize(), service.fetchShifts);
router.post("/create", authorize(), service.createShift);
router.patch("/:id", authorize(), service.updateShift);
module.exports = router;
