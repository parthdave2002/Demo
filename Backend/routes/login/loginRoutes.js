const express = require('express');
const router = express.Router();
const { LoginUser, CheckUser, Forgotpassword, ResetPassword, Logout, Registration, PermissionsUser } = require("../../controller/Login/LoginController");
const uploaderHelper = require('../../helper/fileUploadHelper');
const { authentication } = require('../../helper/auth');

router.post("/login", LoginUser);
router.get("/permission",authentication, PermissionsUser);
router.post("/check-user", CheckUser);
router.post("/forgot-password", Forgotpassword);
router.post('/reset-password', ResetPassword);
router.post("/logout", Logout);
router.post("/registration",uploaderHelper.uploadFiles('public/customer', 'single', 'profile_pic'), Registration);


module.exports = router;