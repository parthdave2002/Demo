const bcrypt = require('bcrypt');
const userSchema = require('../../schema/userSchema');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../helper/emailhelper');
const tokenSchema = require('../../schema/tokenSchema');
const { USER_MESSAGES, AUTH_SUCCESS_MESSAGES, CUSTOMER_MESSAGES } = require("../../constant/message");
const { sendResponse } = require('../../helper/sendResponse');
const customerSchema = require('../../schema/customerSchema');
const roleSchema = require('../../schema/roleSchema');

const LoginUser = (async(req, res, next) =>{
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user)  return sendResponse(res, 400, null, false, USER_MESSAGES.USER_NOT_FOUND );
    if (!user.is_active)  return sendResponse(res, 400, null, false, AUTH_SUCCESS_MESSAGES.BLOCK_USER_ACCOUNT );

    if (password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return sendResponse(res, 400, null, false, AUTH_SUCCESS_MESSAGES.PASSWORD_NOT_MATCH );
    }

    const secretOrKey = process.env.JWTSecret || 'mysecrettoken';
    const payload ={
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }

    let token = await jwt.sign(payload, secretOrKey, {
        expiresIn: process.env.TokenExpiresIn ||'5d',
    });

    let Role = user.role
    const role = await roleSchema.findOne({ _id: Role }).select("permission");
    return sendResponse(res, 200, {token, permission: role?.permission || []}, true, AUTH_SUCCESS_MESSAGES.LOGIN_SUCCESS );
})

const PermissionsUser = async(req, res, next) =>{
    let Role = req.user.role
    const permission = await roleSchema.findOne({_id : Role}).select("permission");
    return sendResponse(res, 200,  permission, true, AUTH_SUCCESS_MESSAGES.PERMISSION_GET_SUCCESSFULLY );
}

const CheckUser = (async(req, res, next) =>{
    const { email } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) return sendResponse(res, 400, null, false, USER_MESSAGES.USER_NOT_FOUND );
    return sendResponse(res, 200, null, true, USER_MESSAGES.USER_EXIST );
})

const Forgotpassword = (async(req, res, next) =>{
    const { email } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user)  return sendResponse(res, 400, null, false, USER_MESSAGES.USER_NOT_FOUND );

    const secretOrKey = process.env.JWTSecret || 'secretkey';
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    let token = await jwt.sign(payload, secretOrKey, {
      expiresIn: process.env.ResetTokenExpiresIn ||'5m',
    });

    await new tokenSchema({
        user_id: user._id,
        token: token,
    }).save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}/${user._id}`;

    const htmlContent = `
    <p>Hello Team,<p/> 
    <p>You received a request from<b> ${user.email}</b> to reset password</p>
    <p><a href=${resetLink}>Click here to Reset Your Password</a></p>
    `;

    await sendEmail(user.email,'Password Reset Request', htmlContent);
    return sendResponse(res, 200, null, true, AUTH_SUCCESS_MESSAGES.RESET_PASSWORD_LINK_SUCCESS );
})

const ResetPassword = (async(req, res, next) =>{
    const { token , user_id, password } = req.body;
    const secret = process.env.JWTSecret || 'mysecrettoken';
    const user = await tokenSchema.findOne({ user_id: user_id, token: token });
    await jwt.verify(token, secret,(async(err, decoded) =>{
        if (err) {
            return sendResponse(res, 400, null, false, AUTH_SUCCESS_MESSAGES.LINK_EXPIRED);
        } else {
            if (!user) return sendResponse(res, 400, null, false, AUTH_SUCCESS_MESSAGES.LINK_EXPIRED);
            let salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const updatedUser = await userSchema.findByIdAndUpdate({ _id: user_id }, { password: hashedPassword }, { new: true });
            await user.deleteOne();
            return sendResponse(res, 200, updatedUser, true, AUTH_SUCCESS_MESSAGES.PASSWORD_UPDATED_SUCCESS);
        }
    }));
})

const Registration = (async(req, res, next) =>{
    try {
        const { name, email, mobile ,password }  = req.body;
        const existingUser = await customerSchema.findOne({ 
            $or: [{ name }, { email }, { mobile }] 
        });

        if (existingUser) {
            let message = existingUser.name === name ? "Customer name already exists!" :
                          existingUser.email === email ? "Email already exists!" :
                          "Mobile already exists!";
            return res.status(400).send({ message });
        }

        let profilePic = null;
        if (req?.file) {
            profilePic = req.file.filename; 
        }
    
        let salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const data = await customerSchema.create({
            ...req.body,
            password: hashedPassword,
            profile_pic: profilePic,  
        });
    
        const User = await customerSchema.create(data);
        return sendResponse(res, 200, User, true, AUTH_SUCCESS_MESSAGES.REGISTER_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    }
})

const Logout = (async(req, res, next) =>{
    try {
        const user = await userSchema.findOne({ _id: req?.body?.id });
        if (!user) return sendResponse(res, 400, null, false, USER_MESSAGES.USER_NOT_FOUND );
        return sendResponse(res, 200, user, true, AUTH_SUCCESS_MESSAGES.LOGOUT_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
})

module.exports = {
    LoginUser,
    PermissionsUser,
    CheckUser,
    Forgotpassword,
    ResetPassword,
    Registration,
    Logout
};