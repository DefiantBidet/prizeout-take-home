import React from 'react';
import Classnames from 'classnames';
import { useAppSelector } from '../../hooks';
import { selectLoading, selectCheckoutView, setCheckoutView, ViewEnum } from '../../slices/checkout-slice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectIsCheckoutPanelCollapsed } from '../../slices/common-slice';

export interface SetViewProps {
    isCheckoutPanelCollapsedView: boolean;
    isVisible: boolean;
    setView: (view: ViewEnum) => void;
}

export function checkoutPanelViewWrapper<P>(
    WrappedComponent: React.ComponentType<P & SetViewProps>,
    viewName: ViewEnum,
): (props: P) => JSX.Element {
    return (props: P) => {
        const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
        const currentView = useAppSelector(selectCheckoutView);
        const dispatch = useDispatch<AppDispatch>();
        const isCheckoutPanelLoading = useAppSelector(selectLoading);
        const isVisible = currentView == viewName;

        const setView = (view: ViewEnum) => {
            dispatch(setCheckoutView(view));
        };

        const classes = Classnames(
            'checkout-panel__view',
            { 'checkout-panel__view--active': isVisible },
            { isLoading: isCheckoutPanelLoading && isVisible },
        );

        return (
            <div className={classes}>
                <WrappedComponent
                    {...props}
                    isCheckoutPanelCollapsedView={isCheckoutPanelCollapsedView}
                    isVisible={isVisible}
                    setView={setView}
                />
            </div>
        );
    };
}

export default checkoutPanelViewWrapper;
