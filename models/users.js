const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Users", UserSchema)