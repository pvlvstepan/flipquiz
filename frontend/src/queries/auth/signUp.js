import axios from 'axios';

export const signUpQuery = ({ email, password, role }) => {
    return axios.post('/api/user/sign-up', {
        email,
        password,
        role,
    });
};
