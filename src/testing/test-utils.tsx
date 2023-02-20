import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import commonReducer from 'Slices/common-slice';
import checkoutReducer from 'Slices/checkout-slice';
import offerConfigReducer, { PrizeoutOffer, PrizeoutOfferValueOptions } from 'Slices/offers-slice';
import { RootState } from 'SourceRoot/store';

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

export const createMockPrizeoutOffer = (mockPrizeoutOffer?: Partial<PrizeoutOffer>): PrizeoutOffer => {
    const mockOffer: PrizeoutOffer = {
        checkout_hero_url: mockPrizeoutOffer?.checkout_hero_url ?? null,
        currency_code: mockPrizeoutOffer?.currency_code ?? 'USD',
        description: mockPrizeoutOffer?.description ?? '0',
        giftcard_list: mockPrizeoutOffer?.giftcard_list ?? createMockPrizeoutOfferValueOptions(),
        image_url: mockPrizeoutOffer?.image_url ?? 'http://foo.bar.baz/',
        is_enabled: mockPrizeoutOffer?.is_enabled ?? true,
        logomark_url: mockPrizeoutOffer?.logomark_url ?? null,
        name: mockPrizeoutOffer?.name ?? Math.random().toString(36).slice(-10),
        tag: mockPrizeoutOffer?.tag ?? null,
    };

    return mockOffer;
};

export const createMockPrizeoutOfferValueOptions = (): PrizeoutOfferValueOptions[] =>
    Array.from({ length: 4 }, (_, index) => createGiftCardOffer(index));

const createGiftCardOffer = (index: number): PrizeoutOfferValueOptions => {
    const startingValue = 1000;
    const value = index * startingValue;
    const percent = 2.04;
    const savings = Math.floor(value * (percent / 100));
    const cost = Math.floor(value - savings);

    return {
        checkout_value_id: index.toString(10),
        cost_in_cents: cost,
        display_bonus: percent,
        value_in_cents: value,
    };
};
