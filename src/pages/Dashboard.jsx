import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));

    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);

    return (
        <section className="dashboard__section h-screen bg-blue-100 flex flex-row">
            <Sidebar roleID={roleID} />
        </section>
    );
};

export default Dashboard;
