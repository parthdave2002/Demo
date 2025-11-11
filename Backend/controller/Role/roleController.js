const { ROLE_MESSAGES } = require("../../constant/message");
const { sendResponse } = require("../../helper/sendResponse");
const roleSchema = require("../../schema/roleSchema");

const GetAllRole = (async(req, res, next) =>{
    try {

        const search = req.query.search;
        if (search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: "i" } }
                ],
            };
            const userdata = await roleSchema.find(filter);
            return res.status(200).send({ data: userdata, message: "User get successfully!" });
        }

        const id = req.query.id;
        if (id) {
            const roledata = await roleSchema.findById(id);
            return res.status(200).send({ data: roledata, message: "Role Data get successfully!" });
        }

        const roledata = await roleSchema.find();
        return res.status(200).send({ data: roledata, message: "Role Data get successfully!" });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    }
})  

const AddRole = (async (req, res, next) =>{
    try {
        const { name } = req.body;
        if (name) {
            const check_rolename = await roleSchema.findOne({ name });
            if (check_rolename) {
                return sendResponse(res, 400, message, false, ROLE_MESSAGES.ROLE_ALREADY_EXISTING );
            }
        }
        const Role = await roleSchema.create(req.body);
        return sendResponse(res, 200, Role, true, ROLE_MESSAGES.ROLE_CREATED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    }
})  

const UpdateRole = (async(req, res, next) =>{
    try {

           const id  = req.params.id;
           const { name, description , is_active, permission } = req.body;
           if (!id) sendResponse(res, 400, message, false, ROLE_MESSAGES.ROLE_NOT_FOUND );
           const updatedUser = await roleSchema.findByIdAndUpdate(id, { name: name, description: description, is_active: is_active, permission : permission, updated_at: new Date()  }, { new: true });
           return sendResponse(res, 200, User, true, ROLE_MESSAGES.ROLE_UPDATED_SUCCESS );
       } catch (error) {
           return res.status(500).send({ message: "Internal Server Error", error: error.message });   
       }   
})  

const RemoveRole = (async(req, res, next) =>{
    try {
        const id = req.params.id;
        if (!id) return sendResponse(res, 400, null, false, ROLE_MESSAGES.ROLE_NOT_FOUND );

        if (id) {
            const role = await roleSchema.findById(id);
            if (!role) return sendResponse(res, 400, null, false, ROLE_MESSAGES.ROLE_NOT_FOUND );
        }

        const role = await roleSchema.findByIdAndDelete(id);
        return sendResponse(res, 200, role, true, ROLE_MESSAGES.ROLE_DELETED_SUCCESS );
        
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    } 
})  

module.exports = { 
    GetAllRole,
    AddRole,
    UpdateRole,
    RemoveRole
}