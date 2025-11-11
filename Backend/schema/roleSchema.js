const mongoose = require('mongoose');

const roleScheme = mongoose.Schema({
    name: { type: String, required: true},
    description : { type: String },
    is_active: { type: Boolean, default: true },
    permission: [{
        module: { type: String, required: true, enum:["Dashboard","User", "Role", "CMS", "Profile"] },
        view: { type: Boolean, default: false},
        edit: { type: Boolean, default: false},
        delete: { type: Boolean, default: false},
        add: { type: Boolean, default: false},
    
    },],
    added_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
});

module.exports = Role = mongoose.model('role', roleScheme);