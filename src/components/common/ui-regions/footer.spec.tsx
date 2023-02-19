import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { Footer } from './footer';

describe('Test Footer Component', () => {
    test('Component matches snapshot', () => {
        const { asFragment } = render(<Footer />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('No TOS is shown unless on gift card details page', () => {
        render(<Footer />);

        expect(screen.queryByText('Terms and Conditions')).not.toBeInTheDocument();
    });
});
