import React from 'react'
import { logoutUser } from "../../services/authService"
import { SET_LOGIN, SET_NAME, selectName } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/loader/Loader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const name = useSelector(selectName)

    const loggingOut = async () => {
        setIsLoading(true)
        await logoutUser();
        await dispatch(SET_LOGIN(false));
        navigate('/login')
        setIsLoading(false)
    }

    return (
        <div className='--pad header'>
            <div className="--flex-between">
                <h3>
                    <span className='--fw-thin' >Welcome, </span>
                    <span className='----color-danger'>{name} </span>
                </h3>
                <button className='--btn --btn-danger' onClick={loggingOut} >Logout</button>
                {isLoading && <Loader />}
            </div>
            <hr />
        </div>
    )
}

export default Header;