import { BrowserRouter } from 'react-router-dom';

import { QueriesProvider } from './QueriesProvider';
import { ThemeProvider } from './ThemeProvider';

export const RootProvider = ({ children }) => {
    return (
        <BrowserRouter>
            <QueriesProvider>
                <ThemeProvider>{children}</ThemeProvider>
            </QueriesProvider>
        </BrowserRouter>
    );
};
