import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

const EmailSection = () => {
    return (
        <div style={{ margin: '20px 0' }}>
            <Grid container spacing={1}>
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    <MailOutlineIcon sx={{ fontSize: '50px' }} />
                    <h3 style={{ margin: '5px' }}>Change You Email</h3>
                </Grid>
                <Grid item xs={10}>
                    <Card sx={{ backgroundColor: 'white' }}>
                        <CardContent>
                            <h4 style={{ margin: '5px' }}>
                                update your email address
                            </h4>
                            <p>Your email is currenty </p>
                            <form>
                                <TextField
                                    helperText="NEW EMAIL"
                                    variant="standard"
                                    focused
                                    sx={{
                                        width: '100%',
                                        margin: '15px 0',
                                    }}
                                />

                                <TextField
                                    helperText="QUIZLET PASSWORD"
                                    variant="standard"
                                    focused
                                    sx={{
                                        width: '100%',
                                        margin: '15px 0',
                                    }}
                                />
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                                <p>
                                    If you forget your password, you can
                                    <Link href="password" underline="none">
                                        Reset your password.
                                    </Link>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default EmailSection;
