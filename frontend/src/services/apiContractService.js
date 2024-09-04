import axios from 'axios';

export const getContracts = async (profileId) => {
    try {
        const response = await axios.get('http://localhost:3001/contracts', {
            headers: {
                'profile_id': profileId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching contracts', error);
        throw error;
    }
};

export const getContractId = async (contractId, profileId) => {
    try {
        const response = await axios.get(`http://localhost:3001/contracts/${contractId}`, {
            headers: {
                'profile_id': profileId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching contracts by Id', error);
        throw error;
    }
};

