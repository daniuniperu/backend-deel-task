import React, { useState } from 'react';
import { getContracts } from '../../services/apiContractService';
import './GetContracts.css'; 

const GetContracts = () => {
    const [contracts, setContracts] = useState([]);
    const [profileId, setProfileId] = useState('');
    const [error, setError] = useState(null);

    const fetchContracts = async () => {
        try {
            const response = await getContracts(profileId);
            setContracts(response);
            setError(null); // Clear any previous error
        } catch (err) {
            setError('Failed to fetch contracts');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchContracts();
    };

    return (
        <div className="container">
            {error && <p className="error">{error}</p>}
            <h2>Contracts</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <label>
                    Type your Profile ID:
                    <input
                        type="text"
                        value={profileId}
                        onChange={(e) => setProfileId(e.target.value)}
                        placeholder='1'
                    />
                </label>
                <button type="submit">Fetch Contracts</button>
            </form>

            {contracts.length > 0 ? (
                <ul className="contract-list">
                    {contracts.map(contract => (
                        <li key={contract.id}>
                            {`Contract ID: ${contract.id}, Client ID: ${contract.ClientId}, Status: ${contract.status}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No contracts found.</p>
            )}
        </div>
    );
};

export default GetContracts;
