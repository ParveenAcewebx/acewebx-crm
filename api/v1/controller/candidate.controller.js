require("dotenv").config();
var commonHelper = require("../helper/common.helper");
var bcrypt = require("bcryptjs");
const config = require("../../../config/db.config");
var jwt = require("jsonwebtoken");
const authServices = require("../services/auth.services");
const { check, validationResult } = require("express-validator"); // Updated import
const candidateServices = require("../services/candidate.services");
const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return error.msg;
    },
});

module.exports = {
    /*insertCandidate*/
    async insertCandidate(req, res) {
        try {

            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(200)
                    .send(commonHelper.parseErrorRespose(errors.mapped()));
            }
            let data = req.body;
            const postData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                dob: data.dob, 
                totalExperience: data.totalExperience,
                relevantExperience: data.relevantExperience,
                currentSalary: data.currentSalary,
                expectedSalary: data.expectedSalary,
                noticePeriod: data.noticePeriod,
                status: data.status
              };
              
            await candidateServices.insertCandidate(postData);
            return res
                .status(200)
                .send(commonHelper.parseSuccessRespose("","Candidtae register successfully"));
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Candidate Register failed",
                data: error.response?.data || {}
            });
        }
    },
  


}