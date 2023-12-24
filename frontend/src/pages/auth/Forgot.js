import React from "react";
import styles from "./auth.module.scss"
import { AiOutlineMail } from "react-icons/ai"
import Card from "../../components/card/Card"
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/authService";

const Forgot = () => {
    const [email, setEmail] = useState("")


    const forgot = async (e) => {
        e.preventDefault()

        if (!email) {
            return toast.error("Please enter a mail")
        }
        const userData = {
            email
        }

        await forgotPassword(userData)
        setEmail("")

    }
    return (
        <div className={`conainer ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <AiOutlineMail size={35} color="#999" />
                    </div>
                    <h2>Forgot password</h2>

                    <form>
                        <input type="text" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <button type="submit" className="--btn --btn-primary --btn-block" onClick={forgot}>Get Reset Email</button>

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

export default Forgot