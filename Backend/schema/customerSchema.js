const mongoose = require('mongoose');

const customerScheme = mongoose.Schema({
    profile_pic: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true},
    mobile : { type: String },
    password: { type: String, required: true},
    date_of_birth : { type: Date},
    gender : { type: String, required: true, enum:["male", "female", "other"]},
    bio : { type: String },
    hobbies : { type: String },
    education : { type: String },
    is_active: { type: Boolean, default: true },
    added_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
});

module.exports = Customer = mongoose.model('customer', customerScheme);