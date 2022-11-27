import axios from 'axios';

export const getStudyCardCommentsQuery = (id) => {
    return axios.get(`/api/study-card/comment/${id}`);
};
