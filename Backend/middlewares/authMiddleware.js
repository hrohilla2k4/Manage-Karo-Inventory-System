// Importing required dependencies
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require("jsonwebtoken")

// Protect component 

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.Token
        if (!token) {
            res.status(401)
            throw new Error("Not authorised, Please login")

        }

        //Verify token if token present

        const verifiedToken = jwt.verify(token, process.env.jwtSecrets)

        // Get user id from the token

        const user = await User.findById(verifiedToken.id).select("-password")

        if (!user) {
            res.status(401)
            throw new Error("User not found")
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401)
        throw new Error("Unauthorized access")

    }
})

module.exports = protect