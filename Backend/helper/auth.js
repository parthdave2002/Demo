const jwt = require("jsonwebtoken");
const roleAccessModel = require("../schema/roleSchema");
const { sendResponse } = require("./sendResponse");

const authorization = (module) => async(req, res, next) => {
    const methodPermissionMap = {
        GET: "view",
        POST: "add",
        PUT: "edit",
        DELETE: "delete",
      };
    
      try {
        const role  = req.user.role;
        
        if( role != "67c0698cd1b13862c4688949"){
            const { method } = req; 
            const requiredPermission = methodPermissionMap[method];
            
            if (!role || !role.length) {
            return sendResponse(res, 401, null, false, 'Role Not Found');
            }
        
            const roleAccesses = await roleAccessModel.find({ _id: role }).select("permission");
            if (!roleAccesses.length) {
            return sendResponse(res, 401, null,false, "Module Access Restricted");
            }
        
            const userModulePermission = roleAccesses[0].permission.find( (perm) => perm.module === module);
            if (!userModulePermission || !userModulePermission[requiredPermission]) {
                return sendResponse(res, 401, null, false, "Module Access Restricted");
            }
        }
       
        next();
      } catch (err) {
        next(err);
    }
};


const authentication = async(req, res, next) => {
    let token = req.headers.authorization || req.headers.token;
    if (!token) return res.status(401).send("Token not found!");
    const secret = process.env.JWTSecret || 'mysecrettoken';
    token = token.replace('Bearer ', '');

    const checktoken = await jwt.verify(token, secret,((err, decoded) =>{
        if(err) {
            return res.status(401).send("Unauthorized!");
        }
        else{
            req.user= decoded;
            next(); 
        }
    }));

};

module.exports = {
    authorization,
    authentication
}