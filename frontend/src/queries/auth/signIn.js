import axios from 'axios';

export const signInQuery = ({ email, password }) => {
    return axios.post('/api/user/sign-in', {
        email,
        password,
    });
};
