import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const DeleteSection = () => {
    return (
        <div style={{ margin: '20px 0' }}>
            <Grid container spacing={1} justifyContent="center">
                <Grid md={2} sm={12} sx={{ textAlign: 'center' }}>
                    <CloseIcon sx={{ fontSize: '50px' }} />
                    <Typography variant="h5" style={{ marginBottom: '15px' }}>
                        Delete Account
                    </Typography>
                </Grid>
                <Grid md={10} sm={12}>
                    <Card sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ margin: '5px' }}>
                                Permitantly Delete Account
                            </Typography>
                            <Typography>
                                Carefull this will delete all data and connot
                                undone
                            </Typography>
                            <Button
                                variant="contained"
                                color="warning"
                                sx={{ marginTop: '15px' }}
                            >
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
