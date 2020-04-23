import { clearPageTitle, setPageTitle } from './actions';
import { Action } from 'app-types';

const PAGE_DEFAULT_TITLE = 'AfterAcademy | OpenSource Project';

export type State = {
  currentPageTitle: string | null;
};

export const defaultState: State = {
  currentPageTitle: null,
};

const reducer = (state: State = defaultState, { type, payload }: Action): State => {
  switch (type) {
    case clearPageTitle.type:
      return { ...defaultState };
    case setPageTitle.type:
      return {
        ...state,
        currentPageTitle: typeof payload === 'string' ? payload : PAGE_DEFAULT_TITLE,
      };
    default:
      return state;
  }
};

export default reducer;
