import { Stack, styled } from '@mui/material';

export const Wrapper = styled(Stack)`
    height: 60px;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;

    padding: 0 ${({ theme }) => theme.spacing(2)};

    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

    .title {
        align-self: center;
    }
`;

Wrapper.defaultProps = {
    component: 'header',
};
