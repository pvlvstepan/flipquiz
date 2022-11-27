import { useEffect } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {
    Grid,
    IconButton,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    Reorder,
    useDragControls,
    animate,
    useMotionValue,
} from 'framer-motion';

export const NewStudyCardForm = ({
    order,
    deleteDisabled,
    onDelete = () => undefined,
    onDragHandle = () => undefined,
    TermFieldProps,
    DefinitionFieldProps,
}) => {
    return (
        <Paper elevation={0}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={({ palette }) => ({
                    px: 3,
                    py: 1,
                    borderBottom: 1,
                    borderColor:
                        palette.mode === 'light'
                            ? 'divider'
                            : 'background.default',
                })}
            >
                <Typography
                    color={({ palette: { mode, primary } }) =>
                        mode === 'dark' ? 'white' : primary.main
                    }
                    fontWeight={700}
                >
                    {order}
                </Typography>
                <IconButton
                    sx={{
                        ml: 'auto',
                        mr: 1,
                        cursor: 'move',
                    }}
                    onPointerDown={onDragHandle}
                >
                    <DragHandleIcon />
                </IconButton>
                <Tooltip title={deleteDisabled ? '' : 'Delete this term'} arrow>
                    <IconButton
                        sx={{
                            '&:hover': {
                                color: 'error.light',
                            },
                        }}
                        edge="end"
                        disabled={deleteDisabled}
                        onClick={() => onDelete()}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Grid container spacing={3} sx={{ p: 3 }}>
                <Grid item xs={6}>
                    <TextField
                        variant="standard"
                        label="Term"
                        fullWidth
                        placeholder="Enter term"
                        multiline
                        color="warning"
                        {...TermFieldProps}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="standard"
                        label="Definition"
                        fullWidth
                        placeholder="Enter definition"
                        multiline
                        color="warning"
                        {...DefinitionFieldProps}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)';

export function useRaisedShadow(value) {
    const boxShadow = useMotionValue(inactiveShadow);

    useEffect(() => {
        let isActive = false;
        value.onChange((latest) => {
            const wasActive = isActive;
            if (latest !== 0) {
                isActive = true;
                if (isActive !== wasActive) {
                    animate(boxShadow, '0 0 30px rgba(0,0,0,0.3)');
                }
            } else {
                isActive = false;
                if (isActive !== wasActive) {
                    animate(boxShadow, inactiveShadow);
                }
            }
        });
    }, [value, boxShadow]);

    return boxShadow;
}

export const StudyCardFormReorder = ({ id, ...studyCardProps }) => {
    const controls = useDragControls();
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);

    return (
        <Reorder.Item
            id={id}
            value={id}
            style={{
                boxShadow,
                y,
                borderRadius: 8,
                transformStyle: 'preserve-3d',
            }}
            dragListener={false}
            dragControls={controls}
            as="div"
        >
            <NewStudyCardForm
                {...studyCardProps}
                onDragHandle={(e) => controls.start(e)}
            />
        </Reorder.Item>
    );
};
