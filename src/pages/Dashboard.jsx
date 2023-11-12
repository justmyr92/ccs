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
            <div className="dashboard__container p-5 flex flex-col w-full h-full overflow-y-auto">
                <h3 className="text-2xl">Dashboard</h3>
                <div className="dashboard__content bg-white rounded-lg shadow-lg p-5 mt-5">
                    <h4 className="text-xl">Welcome back, Admin!</h4>
                    <p className="text-gray-500">
                        You can manage all the data here.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
