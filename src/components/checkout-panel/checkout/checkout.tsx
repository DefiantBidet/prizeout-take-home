import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GiftCardImage } from 'Components/common/ui-widgets/gift-card-image';
import { PrizeoutOffer, PrizeoutOfferValueOptions, getActiveOffer } from 'Slices/offers-slice';
import { getSelectedOfferOption, setSelectedOfferOption } from 'Slices/checkout-slice';
import { useAppSelector } from 'SourceRoot/hooks';
import { AppDispatch } from 'SourceRoot/store';

import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import CheckoutOfferOptions from './offers-options';

import './checkout.less';

/**
 * Returns the Header String for the checkout panel based on
 * the current selected offer, if applicable.
 * @param  {PrizeoutOffer}  activeOffer  Current Selected Offer
 * @return {string}                      Section Header
 * @function
 */
const getOfferHeader = (activeOffer: PrizeoutOffer): string => {
    if (!activeOffer) {
        return 'Select an offer to learn more';
    }

    return activeOffer.name;
};

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const activeOffer: PrizeoutOffer = useAppSelector(getActiveOffer);
    const selectedOption: PrizeoutOfferValueOptions = useAppSelector(getSelectedOfferOption);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const firstOption = activeOffer?.giftcard_list[0];
        dispatch(setSelectedOfferOption(firstOption));
    }, [activeOffer]);

    const onSelectOffer = (offerOption: PrizeoutOfferValueOptions) => {
        dispatch(setSelectedOfferOption(offerOption));
    }

    const displayRedeemOptions = (): JSX.Element => (
        <div className="checkout__options">
            <div className="checkout__options__card">
                <GiftCardImage imgUrl={activeOffer.image_url} altText={activeOffer.name} />
            </div>
            {selectedOption && (
                <CheckoutOfferOptions
                    activeOffer={activeOffer}
                    selectedOption={selectedOption}
                    onSelectOffer={onSelectOffer}
                />
            )}
        </div>
    );

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">
                        <h3>{getOfferHeader(activeOffer)}</h3>
                        {activeOffer && displayRedeemOptions()}
                    </section>
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">{activeOffer && <CheckoutButton />}</section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
