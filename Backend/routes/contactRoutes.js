const express = require("express")
const protect = require("../middlewares/authMiddleware")
const contactUs = require("../controllers/contactController")
const router = express.Router()

// Api to contact us
router.post("/contactus", protect, contactUs)

module.exports = router