export const getPublicUsername = (username, id) => {
    return (
        <span>
            {username}
            <span style={{ opacity: 0.7 }}>#{id.substring(20, 23)}</span>
        </span>
    );
};
