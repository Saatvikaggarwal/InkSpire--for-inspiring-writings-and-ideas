import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SwitchAccount.css';

const SwitchAccount = () => {
    const navigate = useNavigate();

    const handleSwitchAccount = async () => {
        console.log("Switching account...");
        try {
            // Remove the string concatenation, use template literal or direct URL
            const response = await axios.post(
                "https://inkspire-for-inspiring-writings-and-gngz.onrender.com/api/auth/logout",
                {},
                {
                    withCredentials: true
                }
            );

            console.log("Logout successful:", response.data);

            //  Navigate first, then reload if needed
            navigate("/login");

        } catch (err) {
            console.error("Error switching account:", err);

            // Even if logout fails, still navigate to login
            navigate("/login");
        }
    };

    return (
        <div className="switch-account-container">
            <div className="switch-account-box">
                <h2>Are you sure you want to switch account?</h2>
                <button className="yes-btn" onClick={handleSwitchAccount}>Yes</button>
                <button className="no-btn" onClick={() => navigate("/dashboard")}>No</button>
            </div>
        </div>
    );
};

export default SwitchAccount;