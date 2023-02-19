import React from 'react';
import Classnames from 'classnames';
import { GiftCard, BonusTag } from 'Components/common/';
import { PrizeoutOffer, getActiveOffer } from 'Slices/offers-slice';
import { useAppSelector } from 'SourceRoot/hooks';

import './offer-gift-card.less';

interface OfferGiftCardProps {
    offer: PrizeoutOffer;
    onClickHandler: (offer: PrizeoutOffer) => void;
}

export const OfferGiftCard: React.FC<OfferGiftCardProps> = ({
    offer,
    onClickHandler,
}): React.ReactElement => {
    const activeOffer = useAppSelector(getActiveOffer);

    const activeOfferId = activeOffer?.giftcard_list[0].checkout_value_id;

    const firstGiftCard = offer.giftcard_list[0];
    const firstCardOfferId = firstGiftCard.checkout_value_id;

    const offerType = firstGiftCard.display_monetary_bonus
        ? 'monetary'
        : 'percentage';
    const offerValue = firstGiftCard.display_bonus;
    const classes: string = Classnames('offer-gift-card', {
        'offer-gift-card--selected': activeOfferId === firstCardOfferId,
    });

    const onSelectOffer = (event: React.SyntheticEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        onClickHandler(offer);
    };

    const selectOfferOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            onSelectOffer(event);
        }
    };

    return (
        <button
            className={classes}
            onClick={onSelectOffer}
            onKeyDown={selectOfferOnEnter}
        >
            <GiftCard
                name={offer.name}
                imgUrl={offer.image_url}
                altText={offer.name}
                className="offer"
            />
            {offerValue > 0 && (
                <BonusTag type={offerType} value={offerValue} size="small" />
            )}
        </button>
    );
};
