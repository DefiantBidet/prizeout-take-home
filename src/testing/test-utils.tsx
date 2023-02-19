import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import commonReducer from '../slices/common-slice';
import checkoutReducer from '../slices/checkout-slice';
import offerConfigReducer from '../slices/offers-slice';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootState } from '../store';

interface CustomRenderOptions extends RenderOptions {
    preloadedState?: RootState;
    route?: string;
}

interface AllProviderProps {
    children: NonNullable<React.ReactNode>;
}

const AllTheProviders = (store: EnhancedStore) =>
    function RenderWrapper({ children }: AllProviderProps): ReactElement {
        return (
            <Provider store={store}>
                <Router>{children}</Router>
            </Provider>
        );
    };

const customRender = (ui: React.ReactElement, options: CustomRenderOptions = {}): RenderResult => {
    if ('route' in options) {
        window.history.pushState({}, '', options.route);
    }

    let proloadedStateValue = {};

    if ('preloadedState' in options) {
        proloadedStateValue = options.preloadedState;
    }

    const store = configureStore({
        preloadedState: proloadedStateValue,
        reducer: {
            checkout: checkoutReducer,
            common: commonReducer,
            offers: offerConfigReducer,
        },
    });

    return render(ui, {
        wrapper: AllTheProviders(store),
        ...options,
    });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
