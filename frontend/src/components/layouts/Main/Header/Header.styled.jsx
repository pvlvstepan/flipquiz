import { Stack, styled } from '@mui/material';

export const Wrapper = styled(Stack)`
    height: 60px;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;

    padding: 0 ${({ theme }) => theme.spacing(2)};

    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    background-color: white;

    .title {
        align-self: center;
    }

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
`;

Wrapper.defaultProps = {
    component: 'header',
};
