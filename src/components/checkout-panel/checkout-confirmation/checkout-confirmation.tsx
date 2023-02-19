import React from 'react';
import PropTypes from 'prop-types';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import './checkout-confirmation.less';

const CheckoutConfirmationPanelView: React.FC<SetViewProps> = ({ setView }): React.ReactElement => {
    return (
        <section className="checkout-confirmation">
            <h2>Checkout Confirmation Panel</h2>
            <button onClick={() => setView('checkout')}>Done</button>
        </section>
    );
};

CheckoutConfirmationPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutConfirmationPanelView, 'checkout-confirmation');
