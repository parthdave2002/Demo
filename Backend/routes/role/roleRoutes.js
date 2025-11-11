const express = require('express');
const router = express.Router();
const { GetAllRole, AddRole, UpdateRole, RemoveRole } = require("../../controller/Role/roleController");
const { authentication, authorization } = require('../../helper/auth');
const { Enums } = require('../../constant/enum');

router.get("/get-role",authentication,authorization(Enums.Role), GetAllRole);
router.post("/create-role",authentication,authorization(Enums.Role), AddRole);
router.put("/update-role/:id",authentication,authorization(Enums.Role), UpdateRole);
router.delete("/remove-role/:id",authentication,authorization(Enums.Role), RemoveRole);

module.exports = router;