import React, { useState } from 'react';
import { getContractId } from '../../services/apiContractService';
import './ContractDetails.css';  // Importa el archivo CSS

const ContractDetails = () => {
    const [contractId, setContractId] = useState('');
    const [profileId, setProfileId] = useState('');
    const [contract, setContract] = useState(null);
    const [error, setError] = useState('');

    const fetchContractId = async () => {
        try {
            const response = await getContractId(contractId, profileId);
            setContract(response);
            setError(''); // Clear any previous error

        } catch (err) {
            setError('Contract Not Found.');
            setContract(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchContractId();
    };

    return (
        <div className="container">
            <h1>Fetch Contract Details</h1>
            <form onSubmit={handleSubmit} className="form-group">
                <label>
                    Type your Profile ID:
                    <input
                        type="text"
                        value={profileId}
                        onChange={(e) => setProfileId(e.target.value)}
                        placeholder='1'
                    />
                </label><br/>
                <label>
                    Contract ID:
                    <input
                        type="text"
                        value={contractId}
                        onChange={(e) => setContractId(e.target.value)}
                    />
                </label>
                <button type="submit">Fetch Contract by ID</button>
            </form>
            {error && <p className="error">{error}</p>}
            {contract && (
                <div className="contract-details">
                    <h2>Contract Details</h2>
                    <p><strong>Contract ID:</strong> {contract.id}</p>
                    <p><strong>Client ID:</strong> {contract.ClientId}</p>
                    <p><strong>Status:</strong> {contract.status}</p>
                </div>
            )}
        </div>
    );
};

export default ContractDetails;
