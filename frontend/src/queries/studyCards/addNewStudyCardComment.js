import axios from 'axios';

export const addNewStudyCardComment = (id, content) => {
    return axios.post(`/api/study-card/comment/${id}`, {
        content,
    });
};
