const { USER_MESSAGES, AUTH_SUCCESS_MESSAGES } = require("../../constant/message");
const { sendResponse } = require("../../helper/sendResponse");
const userSchema = require("../../schema/userSchema");

const GetUserProfile = (async(req, res, next) =>{
    try {
        const id  = req.user.id;
        if (!id) return sendResponse(res, 400, null, false, USER_MESSAGES.USER_NOT_FOUND );
        if (id) {
            const userData = await userSchema.findOne({ _id: id }).select("username email role is_active added_at mobile").populate("role", "name");
            return sendResponse(res, 200, userData, true, AUTH_SUCCESS_MESSAGES.PROFILE_FETCH_SUCCESS );
        }
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });   
    }
    
});

const UpdateUserProfile = (async(req, res, next) =>{
    try {
        const id =  req.params.id;
        const { username,email, mobile } = req.body;
        // if (!id || !mongoose.Types.ObjectId.isValid(id))  return res.status(400).json({ message: "Invalid or missing User ID!" });
        if (!id) return sendResponse(res, 400, null, false, USER_MESSAGES.USER_NOT_FOUND );
        const updatedUser = await userSchema.findByIdAndUpdate(id, { username: username, email:email, mobile : mobile?.toString()  }, { new: true });
        return sendResponse(res, 200, updatedUser, true, AUTH_SUCCESS_MESSAGES.UPDATE_PROFILE_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });   
    }
});

module.exports = { 
    GetUserProfile,
    UpdateUserProfile
}