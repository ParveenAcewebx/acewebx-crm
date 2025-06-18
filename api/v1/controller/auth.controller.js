require("dotenv").config();
var commonHelper = require("../helper/common.helper");
var bcrypt = require("bcryptjs");
const config = require("../../../config/db.config");
var jwt = require("jsonwebtoken");
const authServices = require("../services/auth.services");
const { check, validationResult } = require("express-validator"); // Updated import
const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return error.msg;
    },
});

module.exports = {
    /*user register*/
    async register(req, res) {
        try {

            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(200)
                    .send(commonHelper.parseErrorRespose(errors.mapped()));
            }
            let data = req.body;
            const getUserInfo = await authServices.getUserByEmail(data.email);
            if (getUserInfo) throw new Error("User already exist");
            const postData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                dob: data.dob, 
                totalExperience: data.totalExperience,
                relevantExperience: data.relevantExperience,
                ccurrentSalary: data.currentSalary,
                expectations: data.expectations,
                noticePeriod: data.noticePeriod,
                status: data.status
              };
              
            await authServices.register(postData);
            return res
                .status(200)
                .send(commonHelper.parseSuccessRespose("", "User register successfully"));
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Register failed",
                data: error.response?.data || {}
            });
        }

    },
  


}