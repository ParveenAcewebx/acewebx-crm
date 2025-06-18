var express = require("express");
var router = express.Router();
const authController = require("../controller/auth.controller");
var { authJwt } = require("../middleware");

/*register*/
router.post("/auth/register", authController.register);



module.exports = router;
