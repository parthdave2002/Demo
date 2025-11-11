const express = require('express');
const router = express.Router();
const { GetAllCustomer, AddCustomer, UpdateCustomer, RemoveCustomer } = require("../../controller/Customer/customerController");
const { authorization, authentication } = require('../../helper/auth');
const { Enums } = require('../../constant/enum');
const uploaderHelper = require('../../helper/fileUploadHelper');

router.get("/get-customer",authentication,authorization(Enums.Customer), GetAllCustomer);
router.post("/create-customer",authentication,authorization(Enums.Customer),uploaderHelper.uploadFiles('public/customer', 'single', 'profile_pic'), AddCustomer);
router.put("/update-customer",authentication,authorization(Enums.Customer),uploaderHelper.uploadFiles('public/customer', 'single', 'profile_pic'), UpdateCustomer);
router.delete("/remove-customer",authentication,authorization(Enums.Customer), RemoveCustomer);


module.exports = router;