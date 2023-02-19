import React, { useEffect } from 'react';
import Classnames from 'classnames';
import CheckoutPanelView from './checkout/checkout';
import CheckoutConfirmationPanelView from './checkout-confirmation/checkout-confirmation';
import { useAppSelector } from '../../hooks';
import { selectIsCheckoutPanelCollapsed } from '../../slices/common-slice';
import useTransition from 'react-transition-state';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
    selectIsCollapsedCheckoutPanelOpen,
    toggleIsCollapsedCheckoutPanelOpen,
} from '../../slices/checkout-slice';
import { Overlay } from '../common';

import './checkout-panel.less';

export const CheckoutPanel: React.FC = (): React.ReactElement => {
    const isCollapsedCheckoutPanelOpen = useAppSelector(
        selectIsCollapsedCheckoutPanelOpen,
    );
    const isCheckoutPanelCollapsedView = useAppSelector(
        selectIsCheckoutPanelCollapsed,
    );
    const dispatch = useDispatch<AppDispatch>();
    const [transition, toggleTransition] = useTransition();

    const classes: string = Classnames(
        `checkout-panel z-index-checkout-panel`,
        { 'checkout-panel--side': !isCheckoutPanelCollapsedView },
        { 'checkout-panel--collapsed': isCheckoutPanelCollapsedView },
        {
            [`checkout-panel--${transition.status}`]:
                isCheckoutPanelCollapsedView && transition.status,
        },
    );

    const closeCheckoutPanel = () => {
        if (isCollapsedCheckoutPanelOpen) {
            dispatch(toggleIsCollapsedCheckoutPanelOpen());
        }
    };

    useEffect(() => {
        toggleTransition(isCollapsedCheckoutPanelOpen);
    }, [isCollapsedCheckoutPanelOpen]);

    return (
        <>
            {isCheckoutPanelCollapsedView && isCollapsedCheckoutPanelOpen && (
                <Overlay
                    onClick={() => closeCheckoutPanel()}
                    zIndexType="overlay"
                />
            )}

            <section className={classes}>
                <CheckoutPanelView />
                <CheckoutConfirmationPanelView />
            </section>
        </>
    );
};
