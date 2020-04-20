import { EXAMPLE_ACTION, ActionTypes } from './actions';

export type State = {
    exampleVariable: string | null;
}

export const defaultState: State = {
    exampleVariable: null,
};

const reducer = (state: State = defaultState, action: ActionTypes): State => {
    switch (action.type) {
        case EXAMPLE_ACTION:
            return {
                ...state,
                exampleVariable: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
