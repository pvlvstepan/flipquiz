import axios from 'axios';

export const createNewStudyCardQuery = ({
    name,
    description,
    terms,
    commentsEnabled,
}) => {
    return axios.post('/api/study-card/', {
        name,
        description,
        terms: terms.map((el) => ({
            term: el.term,
            definition: el.definition,
        })),
        commentsEnabled,
    });
};
