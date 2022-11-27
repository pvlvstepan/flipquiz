import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

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

export default ProductHeroLayout;
