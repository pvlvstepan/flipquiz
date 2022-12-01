import DarkModeIcon from '@mui/icons-material/DarkMode';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

const NightmodeSection = () => {
    return (
        <div style={{ margin: '20px 0' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid sm={12} md={2} sx={{ textAlign: 'center' }}>
                    <DarkModeIcon sx={{ fontSize: '50px' }} />
                    <Typography variant="h5" style={{ marginBottom: '15px' }}>
                        Night Mode
                    </Typography>
                </Grid>
                <Grid sm={12} md={10}>
                    <Card sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="light"
                                name="radio-buttons-group"
                            >
                                <div style={{ display: 'flex' }}>
                                    <Box
                                        sx={{
                                            width: 90,
                                            height: 90,
                                            backgroundColor: '',
                                            border: '5px solid',
                                            borderColor: 'primary.dark',
                                            borderRadius: '10px',
                                            margin: '10px',
                                        }}
                                    >
                                        <FormControlLabel
                                            value="light"
                                            control={<Radio />}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 90,
                                            height: 90,
                                            backgroundColor: 'black',
                                            border: '5px solid',
                                            borderRadius: '10px',
                                            margin: '10px',
                                        }}
                                    >
                                        <FormControlLabel
                                            value="dark"
                                            control={<Radio />}
                                        />
                                    </Box>
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
