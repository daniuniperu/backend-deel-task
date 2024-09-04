import axios from 'axios';

export const getBestProfession = async (start, end, limit) => {
    try {
        const response = await axios.get('http://localhost:3001/admin/best-profession', {
            params: {
                start,
                end,
                limit
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching best professions', error);
        throw error;
    }
};

export const getBestClients = async (start, end, limit) => {
    try {
        const response = await axios.get(`http://localhost:3001/admin/best-clients`, {
            params: {
                start,
                end,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching best clients', error);
        throw error;
    }
};

