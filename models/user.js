const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: 'string',
        required: true,
        Unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    name:{
        type: 'string',
        required: true
    }
},{
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;