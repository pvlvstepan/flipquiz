import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const PasswordSection = () => {
    return (
        <div style={{ margin: '20px 0' }}>
            <Grid container spacing={1}>
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    <LockIcon sx={{ fontSize: '50px' }} />
                    <h3 style={{ margin: '5px' }}>Change You Email</h3>
                </Grid>
                <Grid item xs={10}>
                    <Card sx={{ backgroundColor: 'white' }}>
                        <CardContent>
                            <h4 style={{ margin: '5px' }}>
                                update your password
                            </h4>
                            <form>
                                <TextField
                                    helperText="CURRENT PASSWORD"
                                    variant="standard"
                                    type="password"
                                    focused
                                    sx={{
                                        width: '100%',
                                        margin: '15px 0',
                                    }}
                                />

                                <TextField
                                    helperText="NEW PASSWORD"
                                    variant="standard"
                                    type="password"
                                    focused
                                    sx={{
                                        width: '100%',
                                        margin: '15px 0',
                                    }}
                                />
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default PasswordSection;
