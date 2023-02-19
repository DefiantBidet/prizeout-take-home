import React from 'react';
import Classnames from 'classnames';
import { Footer, Header } from '../../../../components/common';
import { CheckoutPanel } from '../../../../components/checkout-panel/checkout-panel';
import DisplayOffers from '../offers/display-offers';
import { useAppSelector } from '../../../../hooks';
import { selectIsCheckoutPanelCollapsed } from '../../../../slices/common-slice';

import './dashboard.less';

const Dashboard: React.FC = (): React.ReactElement => {
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const classes = Classnames('dashboard__wrapper', {
        'dashboard__wrapper--checkout-panel-collapsed-view': isCheckoutPanelCollapsedView,
    });

    return (
        <>
            <div className="dashboard">
                <Header />
                <div className={classes}>
                    <section className="dashboard__content no-scrollbars">
                        <div className="dashboard__inner">
                            <DisplayOffers />
                        </div>
                        <Footer />
                    </section>
                    <CheckoutPanel />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
