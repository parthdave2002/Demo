const express = require('express');
const router = express.Router();
const authRoutes = require('./login/loginRoutes');
const usersRoutes = require('./user/userRoutes');
const roleRoutes = require('./role/roleRoutes');
const cmsRoutes = require('./cms/cmsRoutes');
const customerRoutes = require('./customer/customerRoutes');


router.use('/auth', authRoutes);
router.use('/user', usersRoutes);
router.use('/role', roleRoutes);
router.use('/cms', cmsRoutes);
router.use('/customer', customerRoutes);



module.exports = router;