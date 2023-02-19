import { setIsCheckoutPanelCollapsed, setIsMobilePortrait } from '../../slices/common-slice';
import { AppDispatch } from '../../store';

export const windowResizeHandler: (
    dispatch: AppDispatch,
    isCheckoutPanelCollapsedView: boolean,
    isMobilePortraitView: boolean,
) => void = (dispatch: AppDispatch, isCheckoutPanelCollapsedView: boolean, isMobilePortraitView: boolean) => {
    const isCurrentWindowCheckoutPanelCollapsed = window.innerWidth < 880;
    const isCurrentWindowMobilePortrait = window.innerWidth <= 480;

    if (isCurrentWindowCheckoutPanelCollapsed !== isCheckoutPanelCollapsedView) {
        dispatch(setIsCheckoutPanelCollapsed(isCurrentWindowCheckoutPanelCollapsed));
    }

    if (isCurrentWindowMobilePortrait !== isMobilePortraitView) {
        dispatch(setIsMobilePortrait(isCurrentWindowMobilePortrait));
    }
};
