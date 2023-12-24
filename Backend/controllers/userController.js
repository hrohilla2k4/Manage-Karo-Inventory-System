// Importing required dependencies and files. 
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const crypto = require("crypto")
const Token = require("../models/tokenModel")
const sendEmail = require("../utils/sendMail")

//Generate json web token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.jwtSecrets, { expiresIn: "1d" })
}

// Register user - logic

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = await req.body

    // Validation methods

    if (password < 8) {
        res.status(400)
        throw new Error("Password must be more than 8 characters")
    }

    //Check if user email already exists. 

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Create a new user. 

    const user = await User.create({
        name,
        email,
        password
    })

    // Generate token for the user

    const userCreateToken = generateToken(user._id)

    //Send httpOnly cookie. 
    res.cookie("Token", userCreateToken, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
        secure: true
    })

    //Check if user created

    if (user) {
        const { _id, name, email, image, phoneNumber, bio } = user
        res.status(201).json({
            _id,
            name,
            email,
            image,
            phoneNumber,
            bio,
            userCreateToken

        })
    }
    else {
        res.status(400)
        throw new Error("User not registered")
    }
})

// Login user component

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    //Validate Request

    if (!email || !password) {
        res.status(400)
        throw new Error("Please add email and password")
    }

    //Check if user exists.

    const user = await User.findOne({ email })

    //If user don't exists. 

    if (!user) {
        res.status(400)
        throw new Error("User not found please sign up")
    }

    //If user exists --> Check for correct password

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    const userLoginToken = generateToken(user._id)

    //Send httpOnly cookie. 
    res.cookie("Token", userLoginToken, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
        secure: true
    })

    // If correct password. 

    if (user && passwordIsCorrect) {

        const { _id, name, email, image, phoneNumber, bio } = user
        res.status(200).json({
            _id,
            name,
            email,
            image,
            phoneNumber,
            bio,
            userLoginToken

        })
    }
    else {
        res.status(400)
        throw new Error("Some error present")
    }

})

// Logout user component
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie("Token", "", {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true
    })
    return res.status(200).json({ message: "Successfully logout" })

})

// Get user data component

const getUserData = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        const { _id, name, email, image, phoneNumber, bio } = user
        res.status(200).json({
            _id,
            name,
            email,
            image,
            phoneNumber,
            bio
        })
    }
    else {
        res.status(400)
        throw new Error("User not found")
    }

})

// Get user logged in status
const loggedInStatus = asyncHandler((req, res) => {

    const token = req.cookies.Token

    if (!token) {
        return res.json(false)
    }

    //Verify token

    const verifiedToken = jwt.verify(token, process.env.jwtSecrets)

    if (verifiedToken) {
        return res.json(true)
    }
    else {
        return res.json(false)
    }
})

// Update user component

const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {

        const { name, email, image, phoneNumber, bio } = user
        user.email = email
        user.name = req.body.name || name
        user.image = req.body.image || image
        user.phoneNumber = req.body.phoneNumber || phoneNumber
        user.bio = req.body.bio || bio

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            user_name: updatedUser.name,
            user_email: updatedUser.email,
            user_image: updateUser.image,
            user_phoneNumber: updatedUser.phoneNumber,
            user_bio: updateUser.bio
        })

    }

    else {
        res.status(404)
        throw new Error("User not found")
    }

})

// Change password component
const changePassword = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    const { oldPassword, password } = req.body

    //Validate

    if (!user) {
        res.status(404)
        throw new Error("No user found, please sign up")
    }

    if (!oldPassword || !password) {
        res.status(400)
        throw new Error("Please add old and new password")
    }

    // Password Check 

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

    //Save new password

    if (user && passwordIsCorrect) {
        user.password = password
        await user.save()
        res.status(200).json({
            password: user.password
        })
    }
    else {
        res.status(400)
        throw new Error("Some error occured")
    }

})

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        res.status(404)
        throw new Error("No user found with this email")
    }

    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id })

    if (token) {
        await token.deleteOne()
    }

    // Create reset token

    const resetToken = crypto.randomBytes(32).toString("hex") + user._id

    // Hash token before saving it to db

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Save token to DB (Another method of saving into DB)
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000) //30 minutes
    }).save()

    // Construct reset URL

    const resetUrl = `${process.env.resetPasswordUrl}/resetpassword/${resetToken} `

    // Reset email

    const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the url below to reset your password</p>
    <p>This reset link is valid for 30 minutes</p>

    <a href="${resetUrl}"clicktracking = off>${resetUrl}</a>

    <p>Regards</p>
    <p>Manage Karo Team</p>
    `
    const subject = "Password Reset Request"
    const send_to = email
    const sent_from = process.env.emaiUser

    try {

        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({ message: "Email sent" })

    } catch (error) {

        res.status(500)
        throw new Error("Email not sent")
        console.log(error)
    }

})

// Reset password component

const resetPassword = asyncHandler(async (req, res) => {

    const { password } = req.body
    const { resetToken } = req.params

    // Hash token, then compare to the one in the database
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Find token in db 
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() }
    })

    if (!userToken) {
        res.status(404)
        throw new Error("Token expired or is invalid")
    }

    // Find the user
    const user = await User.findOne({ _id: userToken.userId })

    if (!user) {
        res.status(404)
        throw new Error("No user found")
    }

    // If user found 

    user.password = password
    await user.save()
    res.status(200).json({
        message: "Password reset successful please login"
    })

})

// Export components logic to use in other files

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserData,
    loggedInStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
}