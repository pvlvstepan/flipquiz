export const getPublicUsername = (username, id) => {
    return `${username}#${id.substring(20, 23)}`;
};
