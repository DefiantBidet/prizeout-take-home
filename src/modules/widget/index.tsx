import * as React from 'react';
import { Switch } from 'react-router-dom';

import { Loader, RouterWrapper } from '../../components/common';
import Dashboard from './components/dashboard/dashboard';

export const Widget: React.FC = (): React.ReactElement => (
    <main className="main-content-wrapper">
        <div className="inner-content-wrapper">
            <Switch>
                <RouterWrapper component={Dashboard} restricted={false} path="/" />
            </Switch>
        </div>
        <Loader />
    </main>
);
