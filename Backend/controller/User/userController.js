const { USER_MESSAGES } = require("../../constant/message");
const { sendResponse } = require("../../helper/sendResponse");
const userSchema = require("../../schema/userSchema");
const bcrypt = require("bcrypt");

const GetAllUser = (async(req, res, next) =>{
    try {

        const search = req.query.search;
        if(search) {
            filter = {
                $or: [
                    { username: { $regex: search, $options: "i" } }, 
                    {email: { $regex: search, $options: "i" } }, 
                    {mobile: { $regex: search, $options: "i"}}
                ],
            };
            const userdata = await userSchema.find(filter).populate("role", "name");
            return sendResponse(res, 200, userdata, true, USER_MESSAGES.USER_GET_SUCCESS );
        }

        const id = req.query.id;
        if (id) {
            const userdata = await userSchema.findById(id).populate("role", "name");
            return sendResponse(res, 200, userdata, true, "User get successfully!" );
        }

        const userdata = await userSchema.find().populate("role", "name"); 
        return sendResponse(res, 200, userdata, true, "User get successfully!" );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });   
    }
})  

const AddUser = (async (req, res, next) =>{
    try {
        const { username,email, mobile ,password }  = req.body;
        const existingUser = await userSchema.findOne({ 
            $or: [{ username }, { email }, { mobile }] 
        });

        if (existingUser) {
            let message = existingUser.username === username ? "Username already exists!" :
                          existingUser.email === email ? "Email already exists!" :
                          "Mobile already exists!";
            return sendResponse(res, 400, message, false, USER_MESSAGES.USER_ALREADY_EXISTING );
        }

        let salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const data = await userSchema.create({
            ...req.body,
            password: hashedPassword, 
        });
    
        const User = await userSchema.create(data);
        return sendResponse(res, 200, User, true, USER_MESSAGES.USER_CREATED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    }
   
})  

const UpdateUser = (async(req, res, next) =>{
    try {
        const  id  = req.params.id;
        
        const { username, email, mobile, role, is_active } = req.body;
        if (!id) return  sendResponse(res, 400, updatedUser, true, USER_MESSAGES.USER_NOT_FOUND );
        const updatedUser = await userSchema.findByIdAndUpdate(id, { username: username, email: email, mobile: mobile?.toString(),  role : role, is_active: is_active  }, { new: true });

        return sendResponse(res, 200, updatedUser, true, USER_MESSAGES.USER_UPDATED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });   
    }   
})  

const RemoveUser = (async(req, res, next) =>{
    try {
        const id =  req.params.id;
        if(!id) return sendResponse(res, 400, null, false, USER_MESSAGES.USER_NOT_FOUND );

        if(id){
            const user = await userSchema.findById(id);
            if(!user) return sendResponse(res, 400, null, false, USER_MESSAGES.USER_NOT_FOUND );
        }

        const user = await userSchema.findByIdAndDelete(id);
        return sendResponse(res, 200, user, true, USER_MESSAGES.USER_DELETED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    } 
})  

module.exports = { 
    GetAllUser,
    AddUser,
    UpdateUser,
    RemoveUser
}