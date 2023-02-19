import { render } from '../../../testing/test-utils';
import React from 'react';
import { GiftCard } from './gift-card';

describe('Test Gift Card Component', () => {
    test('Component matches snapshot', () => {
        const { asFragment } = render(<GiftCard name="Default Giftcard" value={50} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
