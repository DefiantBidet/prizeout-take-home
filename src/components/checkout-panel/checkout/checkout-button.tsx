import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'Components/common';
import { fetchClaimOffer } from 'Slices/checkout-slice';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from 'Slices/offers-slice';
import { AppDispatch } from 'SourceRoot/store';

interface CheckoutButtonProps {
    activeOffer: PrizeoutOffer;
    selectedOption: PrizeoutOfferValueOptions;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ activeOffer, selectedOption }): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const buttonText = 'Prizeout Gift Card';

    const buttonHandler = async () => {
        if (!activeOffer || !selectedOption) {
            return;
        }

        await dispatch(fetchClaimOffer());
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
