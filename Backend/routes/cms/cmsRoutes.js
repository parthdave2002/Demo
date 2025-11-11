const express = require('express');
const router = express.Router();
const { GetAllCMS, AddCMS, UpdateCMS, RemoveCMS } = require("../../controller/CMS/cmsController");
const { authentication, authorization } = require('../../helper/auth');
const { Enums } = require('../../constant/enum');

router.get("/get-cms",authentication,authorization(Enums.CMS), GetAllCMS);
router.post("/create-cms",authentication,authorization(Enums.CMS), AddCMS);
router.put("/update-cms/:id",authentication,authorization(Enums.CMS), UpdateCMS);
router.delete("/remove-cms/:id",authentication,authorization(Enums.CMS), RemoveCMS);

module.exports = router;