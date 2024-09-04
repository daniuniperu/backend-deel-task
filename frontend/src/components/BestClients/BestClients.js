import React, { useState } from 'react';
import { getBestClients } from '../../services/apiAdminService';
import './BestClients.css'; 

const BestClients = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [limit, setLimit] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchBestProfession = async () => {
        try {
            const response = await getBestClients(start, end, limit);
            console.log('response:'+JSON.stringify(response))

            setResponse(response);
            setError(null);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error fetching data');
            setResponse(null);
        }
    };

    return (
        <div className="container">
            <h1>Best Clients</h1>
            <div className="form-group">
                <label>
                    Start Date:
                    <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                </label>
                <label>
                    Rows to show:
                    <input type='num' value={limit} onChange={(e) => setLimit(e.target.value)} />
                </label>
                <button onClick={fetchBestProfession}>Get Best Profession</button>
            </div>
            {error && <p className="error">{error}</p>}
            {response && response.length > 0 ? (
                <ul>
                    {response.map(client => (
                        <li key={client.id}>
                            <strong>ID:</strong> {client.id}<br />
                            <strong>Full Name:</strong> {client.fullName}<br />
                            <strong>Paid:</strong> {client.paid}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Best Clients jobs found.</p>
            )}
        </div>
    );
};

export default BestClients;
