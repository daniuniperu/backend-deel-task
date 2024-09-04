import React, { useState } from 'react';
import { postDepositBalance } from '../../services/apiBalanceService';
import './DepositBalance.css';

const DepositBalance = () => {
    const [userId, setUserId] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [profileId, setProfileId] = useState(''); // Assuming you pass the profile ID
    const [message, setMessage] = useState({});
    const [error, setError] = useState('');

    const handleDeposit = async (e) => {
        e.preventDefault();

        try {
            const response = await postDepositBalance(userId, depositAmount, profileId);
            setMessage(response);
            setError('');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'An error occurred during the deposit.');
            } else {
                setError('An error occurred during the deposit.');
            }
            setMessage('');
        }
    };

    return (
        <div className="container">
            <h1>Deposit Balance</h1>
            <form onSubmit={handleDeposit} className="form-group">
                <label>
                    User ID:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your User ID"
                    />
                </label>
                <label>
                    Deposit Amount:
                    <input
                        type="text"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Enter the Deposit Amount"
                    />
                </label>
                <label>
                    Profile ID:
                    <input
                        type="text"
                        value={profileId}
                        onChange={(e) => setProfileId(e.target.value)}
                        placeholder="Enter your Profile ID"
                    />
                </label>
                <button type="submit">Deposit</button>
            </form>
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message.message}, New Balance: {message.balance}</p>}
        </div>
    );
};

export default DepositBalance;
