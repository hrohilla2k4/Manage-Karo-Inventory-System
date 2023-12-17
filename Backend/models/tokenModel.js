// Importing the required dependencies
const mongoose = require("mongoose")

// Creating the token model - how the token data will be saved and what fields
const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

// Exporting token with the help of a variable
const Token = mongoose.model("Token", tokenSchema)
module.exports = Token