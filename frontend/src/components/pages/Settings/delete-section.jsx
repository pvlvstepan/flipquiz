import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const DeleteSection = () => {
    return (
        <div style={{ margin: '20px 0' }}>
            <Grid container spacing={1}>
                <Grid xs={2} sx={{ textAlign: 'center' }}>
                    <CloseIcon sx={{ fontSize: '50px' }} />
                    <h3 style={{ margin: '5px' }}>Delete Account</h3>
                </Grid>
                <Grid xs={10}>
                    <Card sx={{ backgroundColor: 'white' }}>
                        <CardContent>
                            <h4 style={{ margin: '5px' }}>
                                Permitantly Delete Account
                            </h4>
                            <p>
                                Carefull this will delete all data and connot
                                undone
                            </p>
                            <Button variant="contained" color="warning">
                                Delete Account
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default DeleteSection;
