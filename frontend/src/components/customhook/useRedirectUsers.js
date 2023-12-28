import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoginStatus } from '../../services/authService'
import { SET_LOGIN } from '../../redux/features/auth/authSlice'
import { toast } from "react-toastify"

const useRedirectUsers = (path) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const redirectUsers = async () => {
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))

            if (!isLoggedIn) {
                toast.info("Sessione expired")
                navigate(path)
                return
            }
        }
        redirectUsers()
    }, [navigate, path, dispatch])

}

export default useRedirectUsers