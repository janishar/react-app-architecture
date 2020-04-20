import { CLEAR_PAGE_TITLE, SET_PAGE_TITLE, UPDATE_APP_USER_NAME, ActionTypes } from './actions';

const PAGE_DEFAULT_TITLE = 'AfterAcademy | OpenSource Project';

export type State = {
    currentPageTitle: string | null;
    updatedUserName: string | null;
};

export const defaultState: State = {
    currentPageTitle: null,
    updatedUserName: null,
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
        case UPDATE_APP_USER_NAME:
            return {
                ...state,
                updatedUserName: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
