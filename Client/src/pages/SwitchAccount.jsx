import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SwitchAccount.css';

const SwitchAccount = () => {
    const navigate = useNavigate();

    const handleSwitchAccount = async () => {
        console.log("switching account");
        try {
            await axios.post("https://inkspire-for-inspiring-writings-and-gngz.onrender.com"+"/api/auth/logout", {}, { withCredentials: true });
            window.location.reload(); // refresh the page
        } catch (err) {
            console.error("Error switching account:", err);
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
