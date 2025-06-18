var express = require("express");
var router = express.Router();
const candidateController = require("../controller/candidate.controller");
var { authJwt } = require("../middleware");

/*insertCandidate*/
router.post("/candidate/save", candidateController.insertCandidate);



module.exports = router;
