import React from 'react';
import '@testing-library/jest-dom';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from 'Slices/offers-slice';
import { createMockPrizeoutOffer, fireEvent, render } from 'Testing/test-utils';
import { formatCentsToDollar, calculateSavings } from 'Utils/formatters';

import CheckoutOfferOptions from './offers-options';

describe('Test CheckoutOfferOptions Component', () => {
    const activeOffer: PrizeoutOffer = createMockPrizeoutOffer();
    const activeOption: PrizeoutOfferValueOptions = activeOffer.giftcard_list[0];
    const clickSpy = jest.fn();

    const props = {
        activeOffer,
        onSelectOffer: clickSpy,
        selectedOption: activeOption,
    };

    beforeEach(() => {
        clickSpy.mockReset();
    });

    test('Component matches snapshot', () => {
        const { asFragment } = render(<CheckoutOfferOptions {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });

    describe('Options Grid', () => {
        test('Grid Header', () => {
            const { queryByText } = render(<CheckoutOfferOptions {...props} />);
            expect(queryByText('Select Redemption Amount')).toBeInTheDocument();
        });

        test('Displays Buttons', () => {
            render(<CheckoutOfferOptions {...props} />);
            const buttons = document.querySelectorAll('.offer-options__grid__button');
            expect(buttons).toHaveLength(activeOffer.giftcard_list.length);
        });

        test('Clicking Button Calls ClickSpy', async () => {
            const { getByRole } = render(<CheckoutOfferOptions {...props} />);
            const secondButtonOptions = activeOffer.giftcard_list[1];

            expect(clickSpy.mock.calls).toHaveLength(0);

            const button = getByRole('button', { name: formatCentsToDollar(secondButtonOptions.cost_in_cents) });
            fireEvent.click(button);

            expect(clickSpy.mock.calls).toHaveLength(1);
        });
    });

    describe('Options Details', () => {
        test('Displays Redemption Amount label', () => {
            const { queryByText } = render(<CheckoutOfferOptions {...props} />);
            expect(queryByText('Select Redemption Amount')).toBeInTheDocument();
        });

        test('Displays Redemption Amount value', () => {
            render(<CheckoutOfferOptions {...props} />);
            const row: Element = document.querySelector('.offer-options__details').children[0];
            const costValue = formatCentsToDollar(activeOption.value_in_cents);

            expect(row.lastElementChild.innerHTML).toBe(costValue);
        });

        test('Displays Bonus label', () => {
            const { queryByText } = render(<CheckoutOfferOptions {...props} />);
            expect(queryByText('Prizeout Bonus (+2.04%)')).toBeInTheDocument();
        });

        test('Displays Bonus value', () => {
            render(<CheckoutOfferOptions {...props} />);
            const row: Element = document.querySelector('.offer-options__details').children[1];
            const value = calculateSavings(activeOption.cost_in_cents, activeOption.value_in_cents);

            expect(row.lastElementChild.innerHTML).toBe(value);
        });

        test('Displays Value label', () => {
            const { queryByText } = render(<CheckoutOfferOptions {...props} />);
            expect(queryByText('You Get')).toBeInTheDocument();
        });

        test('Displays Value value', () => {
            render(<CheckoutOfferOptions {...props} />);
            const row: Element = document.querySelector('.offer-options__details').children[2];
            const value = formatCentsToDollar(activeOption.value_in_cents);

            expect(row.lastElementChild.innerHTML).toBe(value);
        });
    });
});
