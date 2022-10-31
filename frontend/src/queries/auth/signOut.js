import axios from 'axios';

export const signOutQuery = () => {
    return axios.get('/api/user/sign-out');
};
