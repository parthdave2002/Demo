const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tokenSchema = new mongoose.Schema({
    user_id: { type: schema.Types.ObjectId, ref: 'user'},
    token : { type: String},
});

module.exports= Token = mongoose.model('token', tokenSchema);