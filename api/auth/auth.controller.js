const router = require("express").Router();
const service = require("./auth.service");

router.post("/login/google", service.postLoginGoogle);

module.exports = router;
