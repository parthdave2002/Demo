const { CUSTOMER_MESSAGES } = require("../../constant/message");
const { sendResponse } = require("../../helper/sendResponse");
const customerSchema = require("../../schema/customerSchema");
const bcrypt = require("bcrypt");

const GetAllCustomer = (async(req, res, next) =>{
    try {

        const search = req.query.search;
        if(search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: "i" } }, 
                    { email: { $regex: search, $options: "i" } }, 
                    { mobile: { $regex: search, $options: "i"}}
                ],
            };
            const userdata = await customerSchema.find(filter);
            return sendResponse(res, 200, userdata, true, CUSTOMER_MESSAGES.CUSTOMER_GET_SUCCESS );
        }

        const id = req.query.id;
        if (id) {
            const userdata = await customerSchema.findById(id);
            return sendResponse(res, 200, userdata, true, CUSTOMER_MESSAGES.CUSTOMER_GET_SUCCESS );
        }

        const userdata = await customerSchema.find(); 
        return sendResponse(res, 200, userdata, true, CUSTOMER_MESSAGES.CUSTOMER_GET_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });   
    }
})  

const AddCustomer = (async (req, res, next) =>{
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
    
        let salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const data = await customerSchema.create({
            ...req.body,
            password: hashedPassword, 
        });
        const User = await customerSchema.create(data);
        return sendResponse(res, 200, User, true, CUSTOMER_MESSAGES.CUSTOMER_CREATED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    }
   
})  

const UpdateCustomer = (async(req, res, next) =>{
    try {
        const { id } = req.query;
        const { name, email,date_of_birth, gender, bio,hobbies,education, mobile, is_active } = req.body;
        if (!id) return res.status(400).send({ message: "Customer id not found!" });
        const updatedUser = await customerSchema.findByIdAndUpdate(id, { name: name, email: email, mobile: mobile?.toString(), date_of_birth : date_of_birth, gender:gender, bio : bio,hobbies : hobbies, education:education, is_active: is_active, updated_at: new Date()  }, { new: true });
        return sendResponse(res, 200, updatedUser, true, CUSTOMER_MESSAGES.CUSTOMER_UPDATED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });   
    }   
})  

const RemoveCustomer = (async(req, res, next) =>{
    try {
        const {id} =  req.query;
        if(!id) return sendResponse(res, 400, null, false, CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND );

        if(id){
            const user = await customerSchema.findById(id);
            if(!user) return sendResponse(res, 400, null, false, CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND );
        }

        const user = await customerSchema.findByIdAndDelete(id);
        return sendResponse(res, 200, user, true, CUSTOMER_MESSAGES.CUSTOMER_DELETED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    } 
})  

module.exports = { 
    GetAllCustomer,
    AddCustomer,
    UpdateCustomer,
    RemoveCustomer
}