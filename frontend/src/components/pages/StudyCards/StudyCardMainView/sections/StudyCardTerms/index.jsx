import { useMemo, useState } from 'react';

import {
    Divider,
    Grid,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
} from '@mui/material';

export const StudyCardTerms = ({ terms: unsortedTerms = [] }) => {
    const [order, setOrder] = useState('original');

    const terms = useMemo(() => {
        if (order === 'alphabetical') {
            return unsortedTerms.sort((a, b) => {
                if (a.term < b.term) {
                    return -1;
                }
                if (a.term > b.term) {
                    return 1;
                }
                return 0;
            });
        }

        return unsortedTerms;
    }, [order, unsortedTerms]);

    return (
        <Stack spacing={1}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Typography variant="h5">
                    Terms in this card ({terms.length})
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="caption"
                    sx={{ ml: 'auto', mr: 1 }}
                >
                    Order:
                </Typography>
                <Select
                    size="small"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    inputProps={{
                        sx: {
                            bgcolor: 'background.paper',
                            fontSize: 14,
                            padding: '4px 10px',
                        },
                    }}
                    MenuProps={{
                        transformOrigin: {
                            horizontal: 'right',
                            vertical: 'top',
                        },
                        anchorOrigin: {
                            horizontal: 'right',
                            vertical: 'bottom',
                        },
                    }}
                >
                    <MenuItem value="original">Original</MenuItem>
                    <MenuItem value="alphabetical">Alphabetical</MenuItem>
                </Select>
            </Stack>
            {terms.map((el) => (
                <Paper variant="outlined" key={el._id} sx={{ p: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            {el.term}
                        </Grid>
                        <Grid item>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item>{el.definition}</Grid>
                    </Grid>
                </Paper>
            ))}
        </Stack>
    );
};
