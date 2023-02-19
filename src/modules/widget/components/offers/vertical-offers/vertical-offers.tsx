import React from 'react';
import Classnames from 'classnames';
import { useDispatch } from 'react-redux';

import {
    PrizeoutOffer,
    PrizeoutOfferSettings,
    setActiveOffer,
} from 'Slices/offers-slice';
import { useAppSelector } from 'SourceRoot/hooks';
import { selectIsCheckoutPanelCollapsed } from 'Slices/common-slice';
import { AppDispatch } from 'SourceRoot/store';
import { toggleIsCollapsedCheckoutPanelOpen } from 'Slices/checkout-slice';

import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';

import './vertical-offers.less';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
}

const VerticalOffers: React.FC<OfferView> = ({
    offers,
    viewSettings,
}): React.ReactElement => {
    const isCheckoutPanelCollapsedView = useAppSelector(
        selectIsCheckoutPanelCollapsed,
    );
    const heading = viewSettings.title || 'Recommended for you';
    const classes: string = Classnames('vertical-offers');
    const dispatch = useDispatch<AppDispatch>();

    const offerClickHandler = (offer: PrizeoutOffer) => {
        dispatch(setActiveOffer(offer));

        if (isCheckoutPanelCollapsedView) {
            dispatch(toggleIsCollapsedCheckoutPanelOpen());
        }
    };

    const returnOffers = () => {
        return offers.map((offer) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                onClickHandler={offerClickHandler}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {offers && (
                <div className="vertical-offers__gift-cards">
                    {returnOffers()}
                </div>
            )}
        </div>
    );
};

export default VerticalOffers;
