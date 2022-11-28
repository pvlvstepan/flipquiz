import axios from 'axios';

export const getUserProfile = (id) => {
    return axios.get(`/api/user/${id}`);
};
