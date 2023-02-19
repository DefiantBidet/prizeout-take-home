import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { Logo } from './logo';

describe('Test Logo Component', () => {
    const imgSrc = `https://assets.prizeout.com/Prizeout-logo.svg`;
    const logoAltText = `Prizeout logo`;
    const logoId = `logo`;

    // Matches snapshot
    test('Component matches snapshot', () => {
        const { asFragment } = render(<Logo />);

        expect(asFragment()).toMatchSnapshot();
    });

    // Logo has logo class
    test('Logo has image source', () => {
        render(<Logo />);

        expect(screen.getByTestId(logoId)).toHaveClass('logo');
    });

    // Logo has src attribute with string
    test('Logo has image source', () => {
        render(<Logo />);

        expect(screen.getByTestId(logoId)).toHaveAttribute('src', expect.stringContaining(imgSrc));
    });

    // Logo has alt text
    test('Logo has alt text', () => {
        render(<Logo />);

        expect(screen.getByTestId(logoId)).toHaveAccessibleName(logoAltText);
    });
});
