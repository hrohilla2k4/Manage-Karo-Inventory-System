// Importing the required dependencies
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const sendMail = require("../utils/sendMail")

// Contact us component
const contactUs = asyncHandler(async (req, res) => {

    // Destructuring the subject and message that user will send
    const { subject, message } = req.body

    // Finding whether the sender exists in database or not
    const user = await User.findById(req.user.id)

    // Validating
    if (!user) {
        res.status(404)
        throw new Error("User not found, Please sign up")
    }

    // Validating whether the subject or message is not empty
    if (!subject || !message) {
        res.status(402)
        throw new Error("Please add subject and message")
    }

    // Send email if subject and messsage is present
    const send_to = process.env.contactUsMail
    const sent_from = process.env.emaiUser
    const reply_to = user.email

    try {

        await sendMail(subject, message, send_to, sent_from, reply_to)
        res.status(200).json("Email sent")

    } catch (error) {

        res.status(500).json(error)
        throw new Error("Email not sent")

    }


})


module.exports = contactUs