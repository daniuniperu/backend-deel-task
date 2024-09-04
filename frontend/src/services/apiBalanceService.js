import axios from 'axios';

export const postDepositBalance= async (userId, depositAmount, profileId) => {
    console.log('profileIdprofileIdprofileId'+profileId)
    try { 
        const response = await axios.post(
            `http://localhost:3001/balances/deposit/${userId}`,
            { amount: depositAmount },
            {
                headers: {
                    'profile_id': profileId,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching UnPaid Jobs', error);
        throw error;
    }

};


