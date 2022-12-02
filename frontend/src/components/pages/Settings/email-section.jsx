import { useState } from 'react';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const EmailSection = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const { email, password } = form;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    const submitForm = (e) => {
        e.preventDefault();
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <Grid container spacing={1} justifyContent="center">
                <Grid md={2} sm={12} sx={{ textAlign: 'center' }}>
                    <MailOutlineIcon sx={{ fontSize: '50px' }} />
                    <Typography variant="h5" style={{ marginBottom: '15px' }}>
                        Change You Email
                    </Typography>
                </Grid>
                <Grid md={10} sm={12}>
                    <Card sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ margin: '5px' }}>
                                Update your email address
                            </Typography>
                            <Typography variant="p">
                                Your email is currenty{' '}
                            </Typography>
                            <form onSubmit={submitForm}>
                                <TextField
                                    helperText="NEW EMAIL"
                                    variant="standard"
                                    name="email"
                                    value={email}
                                    focused
                                    onChange={handleChange}
                                    sx={{
                                        width: '100%',
                                        margin: '15px 0',
                                    }}
                                />

                                <TextField
                                    helperText="FLIPQUIZ PASSWORD"
                                    variant="standard"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    focused
                                    type="password"
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

export default EmailSection;
