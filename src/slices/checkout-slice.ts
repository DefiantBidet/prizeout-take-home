// import axios, { AxiosResponse } from 'axios';
import { uuid } from 'uuidv4';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOfferValueOptions } from './offers-slice';

// README:
// mocked API interface for implementation testing
const checkoutAPI = {
    claimOffer: async (payload: CheckoutClaimRequest): Promise<CheckoutClaimResponse> => {
        const waitTimes = {
            maximum: 1500,
            minimum: 250,
        };
        const randomResponseDelay = Math.floor(
            // random inclusive - from MDN docs
            Math.random() * (waitTimes.maximum - waitTimes.minimum) + waitTimes.minimum,
        );

        await new Promise((resolve) => setTimeout(resolve, randomResponseDelay));

        const confirmationId = uuid();
        const responseBody: CheckoutClaimResponseBody = {
            confirmation_id: confirmationId,
            offerName: payload.name,
        };

        const responseEnvelope: CheckoutClaimResponse = {
            body: responseBody,
            status: 200,
        };

        return responseEnvelope;
    },
    // claimOffer: async (payload: CheckoutClaimRequest): Promise<AxiosResponse> =>
    //     await axios({
    //         data: payload,
    //         method: 'post',
    //         url: '/claimOffer',
    //     }),
};

export interface CheckoutSlice {
    confirmation_id?: string;
    isCollapsedCheckoutPanelOpen: boolean;
    loading: boolean;
    selectedOfferOption?: PrizeoutOfferValueOptions;
    view: ViewEnum;
}

export interface CheckoutClaimRequest {
    checkout_value_id: string;
    cost_in_cents: number;
    name: string;
    value_in_cents: number;
}

export interface CheckoutClaimResponseBody {
    confirmation_id: string;
    offerName: string;
    // TODO...
}

export interface CheckoutClaimResponse {
    status: number;
    body: CheckoutClaimResponseBody;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    isCollapsedCheckoutPanelOpen: false,
    loading: false,
    view: 'checkout',
};

export const fetchClaimOffer = createAsyncThunk<CheckoutClaimResponse, void, { state: RootState }>(
    'checkout/claimOffer',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const selectedCard = state.offers.activeOffer;
        const selectedOfferOption = state.checkout.selectedOfferOption;

        const request: CheckoutClaimRequest = {
            checkout_value_id: selectedOfferOption.checkout_value_id,
            cost_in_cents: selectedOfferOption.cost_in_cents,
            name: selectedCard.name,
            value_in_cents: selectedOfferOption.value_in_cents,
        };

        const response = await checkoutAPI.claimOffer(request);
        // return response.data
        return response;
    },
);

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        setSelectedOfferOption(state, action: PayloadAction<PrizeoutOfferValueOptions>) {
            state.selectedOfferOption = action.payload;
        },
        toggleIsCollapsedCheckoutPanelOpen(state) {
            state.isCollapsedCheckoutPanelOpen = !state.isCollapsedCheckoutPanelOpen;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
    // eslint-disable-next-line sort-keys
    extraReducers: (builder) => {
        builder.addCase(fetchClaimOffer.fulfilled, (state, action) => {
            state.confirmation_id = action.payload.body.confirmation_id;
            state.view = 'checkout-confirmation';
        });
    },
});

export const { setCheckoutView, setSelectedOfferOption, toggleIsCollapsedCheckoutPanelOpen, toggleIsLoading } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const getSelectedOfferOption = ({ checkout: { selectedOfferOption } }: RootState): PrizeoutOfferValueOptions =>
    selectedOfferOption;

export const getConfirmationId = ({ checkout: { confirmation_id } }: RootState): string => confirmation_id;

export const selectIsCollapsedCheckoutPanelOpen = ({
    checkout: { isCollapsedCheckoutPanelOpen },
}: RootState): boolean => isCollapsedCheckoutPanelOpen;

export default checkoutSlice.reducer;
