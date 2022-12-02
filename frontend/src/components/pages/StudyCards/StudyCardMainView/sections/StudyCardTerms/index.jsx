import { useState } from 'react';

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

    const sortedTerms = () => {
        if (order === 'alphabetical') {
            return [...unsortedTerms].sort((a, b) => {
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
    };

    return (
        <Stack spacing={1}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                sx={{ mb: 2 }}
                spacing={2}
            >
                <Typography variant="h5">
                    Terms in this card ({sortedTerms().length})
                </Typography>
                <Stack direction="row" alignItems="center">
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
            </Stack>
            {sortedTerms().map((el) => (
                <Paper variant="outlined" key={el._id} sx={{ p: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} zeroMinWidth>
                            {el.term}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={1}
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={1}
                            sx={{ display: { sm: 'none' } }}
                        >
                            <Divider orientation="horizontal" />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            {el.definition}
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Stack>
    );
};
