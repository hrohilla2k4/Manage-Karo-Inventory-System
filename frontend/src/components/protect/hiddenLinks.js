import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice"

export const ShowOnLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return <>{children}</>
    }
    else {
        return null
    }
}

export const ShownOnLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <>{children}</>
    }
    else {
        return null
    }
}