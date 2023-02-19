import * as React from 'react';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Widget } from 'Modules/widget';
import {
    selectIsCheckoutPanelCollapsed,
    selectIsMobilePortrait,
    setIsCheckoutPanelCollapsed,
    setIsMobilePortrait,
} from 'Slices/common-slice';
import { AppDispatch } from 'SourceRoot/store';
import { useAppSelector } from 'SourceRoot/hooks';
import { windowResizeHandler } from 'Utils/event-handlers';

import { Loader } from './common';

import './app.less';

export const App: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const isMobilePortraitView = useAppSelector(selectIsMobilePortrait);

    const windowResize = () => {
        windowResizeHandler(dispatch, isCheckoutPanelCollapsedView, isMobilePortraitView);
    };

    window.addEventListener('resize', windowResize);

    useLayoutEffect(() => {
        const isCheckoutPanelCollapsed = window.innerWidth < 880;
        const isMobilePortrait = window.innerWidth <= 480;

        dispatch(setIsCheckoutPanelCollapsed(isCheckoutPanelCollapsed));
        dispatch(setIsMobilePortrait(isMobilePortrait));

        return () => {
            window.removeEventListener('resize', windowResize);
        };
    }, []);
    return (
        <div className="application-wrapper">
            <div className="app-content-wrapper">
                <Widget />
            </div>
            <Loader />
        </div>
    );
};
