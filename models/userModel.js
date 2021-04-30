const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type:Boolean, default: false, required: true},
        name: {type: String, required: true},
        profile: { 
            img: {data: Buffer, contentType: String},
            firstname: {type: String}, 
            lastname: {type: String}, 
            gender: {type: String}, 
            phone: {type: Number}, 
            busniusename: {type: String}, 
            licencecode: {type: String}, 
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema);

module.exports =  User;