import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import useDarkMode from 'use-dark-mode';

const NightmodeSection = () => {
    const { enable, disable, value } = useDarkMode();

    return (
        <div style={{ margin: '20px 0' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid xs={12} md={2} sx={{ textAlign: 'center' }}>
                    <DarkModeIcon sx={{ fontSize: '50px' }} />
                    <Typography variant="h5" style={{ marginBottom: '15px' }}>
                        Night Mode
                    </Typography>
                </Grid>
                <Grid xs={12} md={10}>
                    <Card sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={value ? 'dark' : 'light'}
                                name="radio-buttons-group"
                            >
                                <div style={{ display: 'flex' }}>
                                    <Paper
                                        sx={{
                                            width: 90,
                                            height: 90,
                                            backgroundColor: 'white',
                                            borderRadius: '10px',
                                            margin: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FormControlLabel
                                            value="light"
                                            sx={{ m: 0 }}
                                            onClick={() => disable()}
                                            control={<Radio />}
                                        />
                                    </Paper>
                                    <Paper
                                        sx={{
                                            width: 90,
                                            height: 90,
                                            backgroundColor: 'black',
                                            borderRadius: '10px',
                                            margin: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FormControlLabel
                                            value="dark"
                                            sx={{ m: 0 }}
                                            onClick={() => enable()}
                                            control={<Radio />}
                                        />
                                    </Paper>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default NightmodeSection;
