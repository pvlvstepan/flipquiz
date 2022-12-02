import axios from 'axios';

export const recordStudyCardAnalytics = (id) => {
    return axios.post(`/api/study-card/analytics/${id}`);
};
