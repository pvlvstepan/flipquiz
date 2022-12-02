import axios from 'axios';

export const getAllStudyCardsQuery = () => {
    return axios.get('/api/study-card/');
};
