import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
export interface CommonState {
    isCheckoutPanelCollapsedView: boolean;
    isMobilePortraitView: boolean;
    loading: boolean;
}

// Define the initial state using that type
export const commonInitialState: CommonState = {
    isCheckoutPanelCollapsedView: false,
    isMobilePortraitView: false,
    loading: false,
};

export const commonSlice = createSlice({
    initialState: commonInitialState,
    name: 'common',
    reducers: {
        setIsCheckoutPanelCollapsed(state, action: PayloadAction<boolean>) {
            state.isCheckoutPanelCollapsedView = action.payload;
        },
        setIsMobilePortrait(state, action: PayloadAction<boolean>) {
            state.isMobilePortraitView = action.payload;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
});

export const { setIsCheckoutPanelCollapsed, setIsMobilePortrait, toggleIsLoading } = commonSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = ({ common: { loading } }: RootState): boolean => loading;

export const selectIsCheckoutPanelCollapsed = ({ common: { isCheckoutPanelCollapsedView } }: RootState): boolean =>
    isCheckoutPanelCollapsedView;

export const selectIsMobilePortrait = ({ common: { isMobilePortraitView } }: RootState): boolean =>
    isMobilePortraitView;

export default commonSlice.reducer;
