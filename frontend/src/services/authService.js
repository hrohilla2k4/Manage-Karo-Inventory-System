// Importing required dependenies
import axios from 'axios'
import { toast } from 'react-toastify'

// Needed value from env file --> but not got
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// Check whether the email is valid or not
export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/users/register`, userData, { withCredentials: true })
        if (response.statusText === "OK") {
            toast.success("Registered Successfully")
        }
        return response.data
    } catch (error) {
        const message = (
            error.response.data.message)
        toast.error(message)
    }
}

// Login user

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/users/login`, userData)
        if (response.statusText === "OK") {
            toast.success("Login successful ..... ")
        }
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }
}

// Logout user

export const logoutUser = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/users/logout`)
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }
}


// Forgot password

export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/users/forgotpassword`, userData)
        toast.success(response.data.message)
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }
}

// Reset password

export const resetPassword = async (userData, resetToken) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/users/resetpassword/${resetToken}`, userData)

    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }
}

// Get login status

export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/users/loggedin`)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }
}



