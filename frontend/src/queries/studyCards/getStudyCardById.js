import axios from 'axios';

export const getStudyCardByIdQuery = (id) => {
    return axios.get(`/api/study-card/${id}`);
};
