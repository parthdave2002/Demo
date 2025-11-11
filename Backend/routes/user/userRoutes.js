const express = require('express');
const router = express.Router();
const { GetAllUser, AddUser, UpdateUser, RemoveUser } = require("../../controller/User/userController");
const { GetUserProfile, UpdateUserProfile } = require("../../controller/User/profileController");
const { authorization, authentication } = require('../../helper/auth');
const { Enums } = require('../../constant/enum');

router.get("/get-user",authentication,authorization(Enums.User), GetAllUser);
router.post("/create-user",authentication,authorization(Enums.User), AddUser);
router.put("/update-user/:id",authentication,authorization(Enums.User), UpdateUser);
router.delete("/remove-user/:id",authentication,authorization(Enums.User), RemoveUser);

router.get("/get-profile",authentication, GetUserProfile);
router.put("/update-profile/:id",authentication,authorization(Enums.Profile), UpdateUserProfile);


module.exports = router;