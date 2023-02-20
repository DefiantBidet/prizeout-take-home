import React from 'react';
import '@testing-library/jest-dom';

import { render, screen } from 'Testing/test-utils';

import CheckoutConfirmationPanelView from './checkout-confirmation';

describe('Test Checkout Confirmation Component', () => {
    test('Component matches snapshot', () => {
        const { asFragment } = render(<CheckoutConfirmationPanelView />);

        expect(asFragment()).toMatchSnapshot();
    });

    test('Component renders header copy', () => {
        render(<CheckoutConfirmationPanelView />);

        expect(screen.queryByText('Checkout Confirmation Panel')).toBeInTheDocument();
    });

    test('Component renders back button', () => {
        render(<CheckoutConfirmationPanelView />);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
