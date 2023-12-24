import React, { useState } from "react";
import styles from "./auth.module.scss"
import { BiRegistered } from "react-icons/bi"
import Card from "../../components/card/Card"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../services/authService"
import { registerUser } from "../../services/authService";
import { useDispatch } from "react-redux"
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";



const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const { name, email, password, confirmPassword } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const register = async (e) => {
        e.preventDefault()

        if (!name || !email || !password) {
            return toast.error("All feilds are required")
        }

        if (password !== confirmPassword) {
            return toast.error("Password do not match")
        }

        if (password.length < 8) {
            return toast.error("Password must be 8 characters")
        }

        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email")
        }

        const userData = {
            name, email, password
        }

        setIsLoading(true)

        try {
            const data = await registerUser(userData)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.name))
            navigate("/dashboard")
            console.log(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error.message)
        }

        console.log(formData)

    }

    return (
        <div className={`conainer ${styles.auth}`}>
            {isLoading && <Loader />}
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <BiRegistered size={35} color="#999" />
                    </div>
                    <h2>Register</h2>

                    <form onSubmit={register}>

                        <input type="text" placeholder="Name" name="name" value={name} onChange={handleInputChange} />
                        <input type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange} />
                        <input type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />


                        <button type="submit" className="--btn --btn-primary --btn-block">Register</button>


                    </form>


                    <span className={styles.register}>
                        <Link to="/">Home</Link>
                        <p>&nbsp;Already have an account ?  &nbsp;</p>
                        <Link to="/login">Login</Link>

                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Register