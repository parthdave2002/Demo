const mongoose = require('mongoose');

const cmsScheme = mongoose.Schema({
    title: { type: String, required: true },
    description : { type: String },
    is_active: { type: Boolean, default: true },
    added_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
});

module.exports = CMS = mongoose.model('cms', cmsScheme);