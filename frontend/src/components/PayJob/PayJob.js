import React, { useState } from 'react';
import { postPayJob } from '../../services/apiJobsService';
import './PayJob.css';

const PayJob = () => {
    const [jobId, setJobId] = useState('');
    const [profileId, setProfileId] = useState('');
    const [message, setMessage] = useState('');

    const handlePayJob = async () => {
        try {
            console.log('jobId:'+jobId)
            console.log('profileId:'+profileId)
            const response = await postPayJob(jobId, profileId);
            console.log('response:'+JSON.stringify(response))
            setMessage(response);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'An error occurred');
            } else {
                setMessage('An error occurred');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePayJob();
    };

    return (
        <div className="container">
            <h2>Pay for a Job</h2>
            <div className="form-group">
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
                    <label>
                        Job ID:
                        <input
                            type="text"
                            value={jobId}
                            onChange={(e) => setJobId(e.target.value)}
                            placeholder="Enter Job ID"
                        />
                    </label>
                    <button type="submit">Pay Job</button>
                </form>
            </div>
            
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default PayJob;
