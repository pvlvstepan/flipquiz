import axios from 'axios';

export const checkAuthQuery = () => {
    return axios.get('/api/user/check-auth');
};
