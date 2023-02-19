import React from 'react';
import { Button } from 'Components/common';

import { PrizeoutOffer, PrizeoutOfferValueOptions } from 'Slices/offers-slice';

interface CheckoutButtonProps {
    activeOffer: PrizeoutOffer;
    selectedOption: PrizeoutOfferValueOptions;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ activeOffer, selectedOption }): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';

    const buttonHandler = () => {
        if (!activeOffer || !selectedOption) {
            return;
        }
        // Checkout logic here
        console.log('checkout click', selectedOption);
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
