const { registerUser, loginUser, logoutUser, getUserData, loggedInStatus, updateUser, changePassword, forgotPassword, resetPassword } = require("../controllers/userController")
const protect = require("../middlewares/authMiddleware")
const express = require("express")
const router = express.Router()

// Register a user path/api
router.post('/register', registerUser)

// Login a user path/api
router.post('/login', loginUser)

//Logout a user path/api
router.get('/logout', logoutUser)

// Get user profile path/api
router.get('/getuserdata', protect, getUserData)

// Get user logged in status
router.get('/loggedin', loggedInStatus)

// Update the user
router.patch("/updateuser", protect, updateUser)
module.exports = router

// Change the password
router.patch('/changepassword', protect, changePassword)

// Forgot password
router.post('/forgotpassword', forgotPassword)

// Reset password
router.put('/resetpassword/:resetToken', resetPassword)