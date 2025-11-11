const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique:true},
    role: { type: schema.Types.ObjectId, ref: 'role', required: true},
    mobile: { type : String, required: true, unique:true},
    password: { type: String, required: true},
    is_active: { type: Boolean, default: true },
    added_at: { type: Date, default: new Date() }
});

module.exports= User = mongoose.model('user', userSchema);