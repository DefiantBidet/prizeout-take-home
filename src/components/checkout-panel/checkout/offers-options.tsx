import React from 'react';
import Classnames from 'classnames';

import { PrizeoutOffer, PrizeoutOfferValueOptions } from 'Slices/offers-slice';
// import { useAppSelector } from 'SourceRoot/hooks';

import './offer-options.less';

const formatCentsToDollar = (valueInCents: number): string =>
    (valueInCents / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });

const formatPercent = (percentValue: number): string =>
    percentValue.toLocaleString('en-US', {
        signDisplay: 'exceptZero',
        style: 'decimal',
    });

const calculateSavings = (cost: number, value: number) =>
    (value / 100 - cost / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });

interface CheckoutOfferOptionsProps {
    activeOffer: PrizeoutOffer;
    selectedOption: PrizeoutOfferValueOptions;
    onSelectOffer: (options: PrizeoutOfferValueOptions) => void;
}

const CheckoutOfferOptions: React.FC<CheckoutOfferOptionsProps> = ({
    activeOffer,
    selectedOption,
    onSelectOffer,
}): React.ReactElement => {
    const onOfferSelect = (optionId: string) => {
        const offerOption = activeOffer.giftcard_list.find(
            (option) => option.checkout_value_id === optionId,
        );

        if (offerOption) {
            onSelectOffer(offerOption);
        }
    };

    return (
        <div className="offer-options">
            <h4>Select Redemption Amount</h4>

            <div className="offer-options__grid">
                {activeOffer.giftcard_list.map(
                    (valueOption: PrizeoutOfferValueOptions) => {
                        const costInDollars = formatCentsToDollar(
                            valueOption.cost_in_cents,
                        );

                        const classes: string = Classnames(
                            'offer-options__grid__button',
                            {
                                'offer-options__grid__button--selected':
                                    selectedOption.checkout_value_id ===
                                    valueOption.checkout_value_id,
                            },
                        );

                        return (
                            <button
                                key={valueOption.checkout_value_id}
                                className={classes}
                                id={`offer-${valueOption.checkout_value_id}`}
                                onClick={() =>
                                    onOfferSelect(valueOption.checkout_value_id)
                                }
                                type="button"
                            >
                                {costInDollars}
                            </button>
                        );
                    },
                )}
            </div>

            <div className="offer-options__details">
                <div className="offer-options__details__row">
                    <div className="offer-options__details__row--label">
                        Redemption Amount
                    </div>
                    <div className="offer-options__details__row--amount">
                        {formatCentsToDollar(selectedOption.cost_in_cents)}
                    </div>
                </div>
                <div className="offer-options__details__row-highlight">
                    <div className="offer-options__details__row--label">
                        Prizeout Bounus{' '}
                        {formatPercent(selectedOption.display_bonus)}%
                    </div>
                    <div className="offer-options__details__row--amount">
                        {calculateSavings(
                            selectedOption.cost_in_cents,
                            selectedOption.value_in_cents,
                        )}
                    </div>
                </div>
                <div className="offer-options__details__row">
                    <div className="offer-options__details__row--label">
                        You Get
                    </div>
                    <div className="offer-options__details__row--amount">
                        {formatCentsToDollar(selectedOption.value_in_cents)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOfferOptions;
