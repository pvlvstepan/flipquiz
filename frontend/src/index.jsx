import React from 'react';

import { render } from 'react-dom';

import { App } from 'App';
import { RootProvider } from 'components/providers';

const root = document.getElementById('root');

render(
    <React.StrictMode>
        <RootProvider>
            <App />
        </RootProvider>
    </React.StrictMode>,
    root
);
