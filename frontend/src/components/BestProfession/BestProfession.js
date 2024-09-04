import React, { useState } from 'react';
import { getBestProfession } from '../../services/apiAdminService';
import './BestProfession.css'; 

const BestProfession = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [bestProfession, setBestProfession] = useState(null);
    const [error, setError] = useState(null);

    const fetchBestProfession = async () => {
        try {
            const response = await getBestProfession(start, end);
            console.log('response:'+JSON.stringify(response))

            setBestProfession(response);
            setError(null);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error fetching data');
            setBestProfession(null);
        }
    };

    return (
        <div className="container">
            <h1>Best Profession</h1>
            <div className="form-group">
                <label>
                    Start Date:
                    <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                </label>
                <button onClick={fetchBestProfession}>Get Best Profession</button>
            </div>
            {error && <p className="error">{error}</p>}
            {bestProfession && (
                <div>
                    <h3>{bestProfession}</h3>
                </div>
            )}
        </div>
    );
};

export default BestProfession;
