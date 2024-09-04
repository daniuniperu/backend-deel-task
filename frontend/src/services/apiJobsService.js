import axios from 'axios';

export const getUnpaidJobs= async (profileId) => {
    try {
        const response = await axios.get('http://localhost:3001/jobs/unpaid', {
            headers: {
                'profile_id': profileId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching UnPaid Jobs', error);
        throw error;
    }
};

export const postPayJob= async (jobId, depositAmount, profileId) => {
    console.log('profileIdprofileIdprofileId'+profileId)
    try { 
        const response = await axios.post(`http://localhost:3001/jobs/${jobId}/pay`, 
            { amount: depositAmount },   
            {
                headers: {
                    'profile_id': profileId, 
                },
            }
        );

        console.log('response.data'+response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching UnPaid Jobs', error);
        throw error;
    }

};

export const postDepositBalance= async (userId, depositAmount, profileId) => {
    console.log('profileIdprofileIdprofileId'+profileId)
    try { 
        const response = await axios.post(
            `http://localhost:3001/users/${userId}/deposit`,
            { amount: depositAmount },
            {
                headers: {
                    'profile_id': profileId, // Ensure this matches the server's expected header key
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching UnPaid Jobs', error);
        throw error;
    }

};


