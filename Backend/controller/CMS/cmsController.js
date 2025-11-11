const { CMS_MESSAGES } = require("../../constant/message");
const cmsScheme = require("../../schema/cmsSchema");
const { sendResponse } = require("../../helper/sendResponse");

const GetAllCMS = (async(req, res, next) =>{
    try {

        const search = req.query.search;
        if(search){
            filter={
                $or:[
                    {title : {$regex:search, $options:"i"}}
                ]
            }
            const userdata = await cmsScheme.find(filter);
            return sendResponse(res, 200, userdata, true, CMS_MESSAGES.CMS_GET_SUCCESS );
        }
    
        const id = req.query.id;
        if (id) {
            const cmsdata = await cmsScheme.findById(id);
            return sendResponse(res, 200, cmsdata, true, CMS_MESSAGES.CMS_GET_SUCCESS );
        }

        const cmsdata = await cmsScheme.find();
        return sendResponse(res, 200, cmsdata, true, CMS_MESSAGES.CMS_GET_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    } 
})  

const AddCMS = (async (req, res, next) =>{
    try {
        const { title } = req.body;
        if (title) {
            const check_title = await cmsScheme.findOne({ title });
            if (check_title) {
                return sendResponse(res, 400, null, false, CMS_MESSAGES.CMS_ALREADY_EXISTING );
            }
        }

        const cms = await cmsScheme.create(req.body);
        return sendResponse(res, 200, cms, true, CMS_MESSAGES.CMS_CREATED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });      
    }
})  

const UpdateCMS = (async(req, res, next) =>{
    try {
        const id  = req.params.id;
        const { title, description, is_active } = req.body;
        if (!id) return sendResponse(res, 400, null, false, CMS_MESSAGES.CMS_NOT_FOUND );
        const updatedUser = await cmsScheme.findByIdAndUpdate(id, { title: title, description: description, is_active: is_active, updated_at: new Date() }, { new: true });
        return sendResponse(res, 200, updatedUser, true, CMS_MESSAGES.CMS_UPDATED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });  
    }
})  

const RemoveCMS = (async(req, res, next) =>{
    try {
        const id =  req.params.id;
        if(!id) return sendResponse(res, 400, null, false, CMS_MESSAGES.CMS_NOT_FOUND );
        if(id){
            const cms = await cmsScheme.findById(id);
            if(!cms){
                return sendResponse(res, 400, null, false, CMS_MESSAGES.CMS_NOT_FOUND );
            }
        }
        const cms = await cmsScheme.findByIdAndDelete(id);
        return sendResponse(res, 200, cms, true, CMS_MESSAGES.CMS_DELETED_SUCCESS );
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });    
    }
})  

module.exports = { 
    GetAllCMS,
    AddCMS,
    UpdateCMS,
    RemoveCMS
}