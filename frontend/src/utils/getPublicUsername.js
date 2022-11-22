export const getPublicUsername = (username, id) => {
    return `${username}#${id.substring(0, 3)}`;
};
