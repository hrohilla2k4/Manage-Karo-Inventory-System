import React from "react";
import useRedirectUsers from "../../components/customhook/useRedirectUsers";

const Dashboard = () => {
    useRedirectUsers("/login")
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard