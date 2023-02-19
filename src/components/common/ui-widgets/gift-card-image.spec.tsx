import { render } from '../../../testing/test-utils';
import React from 'react';
import { GiftCardImage } from './gift-card-image';

describe('Test Gift Card Image Component', () => {
    const imageUrl = 'https://assets.prizeout.com/widget/global/generic-giftcard.png';

    test('Component matches snapshot', () => {
        const { asFragment } = render(<GiftCardImage imgUrl={imageUrl} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
