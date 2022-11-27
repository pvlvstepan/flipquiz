import { useState } from 'react';

import CachedIcon from '@mui/icons-material/Cached';
import {
    Avatar,
    Button,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

import { stringAvatar } from 'components/layouts/Main/Header/UserMenu';
import { addNewStudyCardComment } from 'queries/studyCards/addNewStudyCardComment';
import { getStudyCardCommentsQuery } from 'queries/studyCards/getStudyCardComments';
import { getPublicUsername } from 'utils/getPublicUsername';

const Comment = ({ username, userID, content }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="flex-end">
            <Avatar
                {...stringAvatar(username, {
                    color: 'white',
                    width: 32,
                    height: 32,
                })}
            />
            <Paper sx={{ px: 2, py: 1, minHeight: 50 }}>
                <Stack>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            mb: 0.5,
                            textDecoration: 'none',
                            '&:hover': {
                                color: 'warning.main',
                            },
                        }}
                        color="text.secondary"
                        component={Link}
                        to={`/user/${userID}`}
                    >
                        {getPublicUsername(username, userID)}
                    </Typography>
                    <Typography variant="body2">{content}</Typography>
                </Stack>
            </Paper>
        </Stack>
    );
};

export const StudyCardComments = ({ studyCardId, commentsEnabled }) => {
    const { data, isLoading, refetch, isFetching } = useQuery(
        ['study-card-comments', studyCardId],
        () => getStudyCardCommentsQuery(studyCardId)
    );

    const [comment, setComment] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const { isLoading: newCommentLoading, mutate: postComment } = useMutation(
        ({ studyCardId: id, comment: content }) =>
            addNewStudyCardComment(id, content),
        {
            onSuccess: () => {
                enqueueSnackbar('Comment successfully posted!', {
                    variant: 'success',
                });
                setComment('');
                refetch();
            },
            onError: () => {
                enqueueSnackbar(
                    "Something went wrong... We couldn't post this comment",
                    {
                        variant: 'error',
                    }
                );
            },
        }
    );

    const comments = data?.data;

    const disabled =
        isFetching || isLoading || !commentsEnabled || newCommentLoading;

    return comments ? (
        <Stack spacing={1} sx={{ pb: 5 }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Typography variant="h5">
                    Comments{' '}
                    {comments?.length ? `(${comments.length})` : undefined}
                </Typography>
                {commentsEnabled ? (
                    <Tooltip title={disabled ? '' : 'Reload comments'} arrow>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={refetch}
                            disabled={disabled}
                            sx={{
                                color: 'text.disabled',
                                padding: 0,
                                minHeight: 36,
                                minWidth: 36,
                                borderRadius: '50%',
                            }}
                        >
                            {isFetching || isLoading || newCommentLoading ? (
                                <CircularProgress
                                    size={16}
                                    variant="indeterminate"
                                />
                            ) : (
                                <CachedIcon />
                            )}
                        </Button>
                    </Tooltip>
                ) : undefined}
            </Stack>
            <Stack spacing={3}>
                {comments.map((el) => (
                    <Comment
                        key={el._id}
                        username={el.postedBy.username}
                        userID={el.postedBy._id}
                        content={el.content}
                    />
                ))}
                {commentsEnabled ? (
                    <>
                        {!comments.length ? (
                            <Stack
                                alignItems="center"
                                justifyContent="center"
                                component={Paper}
                                sx={{
                                    minHeight: 100,
                                    color: 'text.disabled',
                                }}
                            >
                                Be the first one to post a comment
                            </Stack>
                        ) : undefined}
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ pl: comments.length ? '40px' : undefined }}
                            spacing={3}
                        >
                            <TextField
                                label="Add new comment"
                                placeholder="Type your comment here"
                                variant="standard"
                                fullWidth
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                disabled={disabled}
                            />
                            <Button
                                variant="contained"
                                disabled={!comment || disabled}
                                onClick={() =>
                                    postComment({ studyCardId, comment })
                                }
                            >
                                Post
                            </Button>
                        </Stack>
                    </>
                ) : (
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        component={Paper}
                        sx={{
                            minHeight: 100,
                            color: 'text.disabled',
                            ml: comments.length ? '40px !important' : undefined,
                        }}
                    >
                        Comments are disabled
                    </Stack>
                )}
            </Stack>
        </Stack>
    ) : null;
};
