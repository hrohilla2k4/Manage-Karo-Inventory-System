import React, { useState } from "react";
import styles from "./auth.module.scss"
import { MdPassword } from "react-icons/md"
import Card from "../../components/card/Card"
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

const Reset = () => {

    const initialState = {

        newpassword: "",
        confirmpassword: ""
    }

    const [formData, setFormData] = useState(initialState)
    const { newpassword, confirmpassword } = formData

    const { resetToken } = useParams()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const reset = async (e) => {
        e.preventDefault()

        if (newpassword.length < 8) {
            toast.error("Please enter upto 8 characters")
        }
        if (newpassword !== confirmpassword) {
            toast.error("Passwords do not match")
        }

        const userData = {
            newpassword,
            confirmpassword
        }

        try {
            await resetPassword(userData, resetToken)

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={`conainer ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <MdPassword size={35} color="#999" />
                    </div>
                    <h2>Reset Password</h2>

                    <form onSubmit={reset}>
                        <input type="password" placeholder="New Password" required name="newpassword" value={newpassword} onChange={handleInputChange} />

                        <input type="password" placeholder="Confirm Password" required name="confirmpassword" value={confirmpassword} onChange={handleInputChange} />

                        <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>

                        <div className={styles.links}>
                            <p> <Link to="/">Home</Link></p>
                            <p> <Link to="/login">Login</Link></p>
                        </div>

                    </form>
                </div>
            </Card>
        </div>
    )
}

export default Reset