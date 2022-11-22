import axios from 'axios';

export const signUpQuery = ({ username, email, password, role }) => {
    return axios.post('/api/user/sign-up', {
        username,
        email,
        password,
        role,
    });
};
