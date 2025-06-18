var commonHelper = require("../helper/common.helper");
const logger = require("../../../config/winston");
const db = require("../models");

module.exports = {
    /*register*/
    async register(postData) {
        try {
            let user = await db.usersObj.create(postData);
            return user;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    },
    /*getUserByEmail*/
    async getUserByEmail(email) {
        try {
            let user = await db.usersObj.findOne({
                where: { email: email},
                raw: true
            });
            return user;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    },
    // /*getUserByEmail*/
    // async getAllUsers() {
    //     try {
    //         let users = await db.usersObj.findAll({
    //             raw: true
    //         })
    //         return users;
    //     } catch (e) {
    //         logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
    //         throw e;
    //     }
    // },
    // /*getUserById*/
    // async getUserById(userId) {
    //     try {
    //         let users = await db.usersObj.findOne({
    //             where: { id: userId },
    //             include: [
    //                 {
    //                   model: db.productObj,
    //                   as: 'products', // Alias for related products
    //                 }
    //               ],
    //             attributes: {
    //                 exclude: ['password']
    //             },
    //         });
            
    //         return users;
    //     } catch (e) {
    //         logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
    //         throw e;
    //     }
    // }
}