var express = require("express");
var router = express.Router();

router.use(require("./auth.routes"));
router.use(require("./candidate.routes"));

module.exports = router;
