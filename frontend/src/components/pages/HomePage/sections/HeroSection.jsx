import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import heroSectionBg from 'assets/images/HPbrng.jpg';

const ProductHeroLayoutRoot = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        height: '70vh',
        minHeight: 500,
        maxHeight: 1300,
    },
}));

const Background = styled(Box)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
});

const ProductHeroLayout = (props) => {
    const { sxBackground, children } = props;

    return (
        <ProductHeroLayoutRoot>
            <Container
                sx={{
                    mt: 3,
                    my: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                {children}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'common.black',
                        opacity: 0.5,
                        zIndex: -1,
                    }}
                />
                <Background sx={sxBackground} />
            </Container>
        </ProductHeroLayoutRoot>
    );
};

export const HeroSection = () => {
    return (
        <ProductHeroLayout
            sxBackground={{
                background: `url(${heroSectionBg})`,
                backgroundPosition: { xs: '70% center', sm: 'center' },
                backgroundSize: 'cover',
            }}
        >
            <Box sx={{ maxWidth: 600 }}>
                <Typography color="inherit" textAlign="left" variant="h2">
                    The best digital flashcards and study tools
                </Typography>
                <Typography
                    color="inherit"
                    textAlign="left"
                    variant="h6"
                    sx={{ mb: 4, mt: { xs: 4, sm: 8 } }}
                >
                    Join approximately more than 60 million students who use
                    Flip Quiz flashcards, exam prep, and professional solutions
                    to enhance their GPAs and accomplish their objectives.
                </Typography>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    component={Link}
                    to={`${window.location.pathname}?auth-modal=sign-up`}
                    sx={{ minWidth: 200 }}
                >
                    Sign up for free
                </Button>
                <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                    Discover the experience now
                </Typography>
            </Box>
        </ProductHeroLayout>
    );
};
