import React from 'react';
import PropTypes from 'prop-types';

import { useAppSelector } from 'SourceRoot/hooks';
import { getConfirmationId } from 'Slices/checkout-slice';

import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';

import './checkout-confirmation.less';

const CheckoutConfirmationPanelView: React.FC<SetViewProps> = ({ setView }): React.ReactElement => {
    const confirmation_id = useAppSelector(getConfirmationId);

    return (
        <section className="checkout-confirmation">
            <h2>Checkout Confirmation Panel</h2>
            <div>confirmation: {confirmation_id}</div>
            <button onClick={() => setView('checkout')}>Done</button>
        </section>
    );
};

CheckoutConfirmationPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutConfirmationPanelView, 'checkout-confirmation');
