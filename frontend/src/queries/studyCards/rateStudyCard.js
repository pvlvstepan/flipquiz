import axios from 'axios';

export const rateStudyCard = (id, rating) => {
    return axios.post(`/api/study-card/rate/${id}`, {
        rating,
    });
};
