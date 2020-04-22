import { CLEAR_PAGE_TITLE, SET_PAGE_TITLE, ActionTypes } from './actions';

const PAGE_DEFAULT_TITLE = 'AfterAcademy | OpenSource Project';

export type State = {
    currentPageTitle: string | null;
};

export const defaultState: State = {
    currentPageTitle: null,
};

const reducer = (state: State = defaultState, action: ActionTypes): State => {
    switch (action.type) {
        case CLEAR_PAGE_TITLE:
            return { ...defaultState };
        case SET_PAGE_TITLE:
            return {
                ...state,
                currentPageTitle:
                    typeof action.payload === 'string' ? action.payload : PAGE_DEFAULT_TITLE,
            };
        default:
            return state;
    }
};

export default reducer;
