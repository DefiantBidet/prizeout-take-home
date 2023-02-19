import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { BonusTag } from './bonus-tag';

describe('Test Bonus Tag Component', () => {
    test('Component matches snapshot', () => {
        const { asFragment } = render(<BonusTag type="percentage" value={15.0} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Monetary bonus displayed correctly', () => {
        const { container } = render(<BonusTag type="monetary" value={22.2} />);

        expect(screen.queryByText('$22.2')).toBeInTheDocument();
        expect(container.getElementsByClassName('monetary').length).toBe(1);
    });

    test('Percentage bonus displayed correctly', () => {
        const { container } = render(<BonusTag type="percentage" value={15.1} />);

        expect(screen.queryByText('15.1%')).toBeInTheDocument();
        expect(container.getElementsByClassName('monetary').length).toBe(0);
    });
});
