import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';

export const RootProvider = ({ children }) => {
    return (
        <StoreProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
    );
};
