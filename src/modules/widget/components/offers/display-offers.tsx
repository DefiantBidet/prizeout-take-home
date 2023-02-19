import React from 'react';
import { v4 as uuid_v4 } from 'uuid';
import { useAppSelector } from '../../../../hooks';
import { PrizeoutOfferViews, selectOffers } from '../../../../slices/offers-slice';
import VerticalOffers from './vertical-offers/vertical-offers';

const DisplayOffers: React.FC = (): React.ReactElement => {
    const offers = useAppSelector(selectOffers);

    const offerFactory = ({ data, settings, type }: PrizeoutOfferViews) => {
        switch (type) {
            case 'vertical-offers':
                return <VerticalOffers offers={data} viewSettings={settings} />;
            default:
                return <VerticalOffers offers={data} viewSettings={settings} />;
        }
    };

    return <div>{offers && offers.map((offer) => <div key={uuid_v4()}>{offerFactory(offer)}</div>)}</div>;
};

export default DisplayOffers;
