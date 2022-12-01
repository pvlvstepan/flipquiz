import { useState } from 'react';

import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const PasswordSection = () => {
    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });
    const { password, confirmPassword } = form;
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
                    <LockIcon sx={{ fontSize: '50px' }} />
                    <Typography variant="h5" style={{ marginBottom: '15px' }}>
                        Change You Password
                    </Typography>
                </Grid>
                <Grid md={10} sm={12}>
                    <Card sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ margin: '5px' }}>
                                Update your password
                            </Typography>
                            <form onSubmit={submitForm}>
                                <TextField
                                    helperText="CURRENT PASSWORD"
                                    variant="standard"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
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
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleChange}
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
