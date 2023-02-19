import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { Overlay } from './overlay';

describe('Test Overlay Component', () => {
    const onClick = jest.fn();
    const overlayId = `overlay`;
    const zIndexClass = `z-index-overlay-sidebar`;
    const zIndexType = `overlay-sidebar`;

    // Matches snapshot
    test('Component matches snapshot', () => {
        const { asFragment } = render(<Overlay onClick={onClick} zIndexType={zIndexType} />);

        expect(asFragment()).toMatchSnapshot();
    });

    // Overlay has overlay class
    test('Overlay has overlay class', () => {
        render(<Overlay onClick={onClick} zIndexType={zIndexType} />);

        expect(screen.getByTestId(overlayId)).toHaveClass('overlay');
    });

    // Overlay has sidebar z-index class if sidebar is open and overlay should be below it
    test('Overlay has z-index class', () => {
        render(<Overlay onClick={onClick} zIndexType={zIndexType} />);

        expect(screen.getByTestId(overlayId)).toHaveClass(zIndexClass);
    });
});
