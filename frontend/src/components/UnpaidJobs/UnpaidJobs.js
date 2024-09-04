import React, { useState } from 'react';
import { getUnpaidJobs } from '../../services/apiJobsService';
import './UnpaidJobs.css'; 

const UnpaidJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [profileId, setProfileId] = useState('');
    const [error, setError] = useState('');

    const fetchUnpaidJobs = async () => {
        try {
            const response = await getUnpaidJobs(profileId);
            console.log('response:'+JSON.stringify(response))
            setJobs(response);
            setError(''); // Clear previous errors
        } catch (err) {
            setError('An error occurred while fetching unpaid jobs.');
            setJobs([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUnpaidJobs();
    };

    return (
        <div className="container">
            <h1>Unpaid Jobs</h1>
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
            {error && <p className="error">{error}</p>}
            {jobs.length > 0 ? (
                <ul className="job-list">
                    {jobs.map(job => (
                        <li key={job.id} className="job-item">
                            <strong>Job ID:</strong> {job.id}<br />
                            <strong>Contract Title:</strong> {job.Contract.title}<br />
                            <strong>Status:</strong> {job.Contract.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No unpaid jobs found.</p>
            )}
        </div>
    );
};

export default UnpaidJobs;