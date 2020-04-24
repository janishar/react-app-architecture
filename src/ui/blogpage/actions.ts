import { AsyncAction, Dispatch, StateFetcher } from 'app-types';
import { actionCreator } from '@utils/creator';

export const sendExample = actionCreator<string>('EXAMPLE_ACTION');

export const exampleAsyncDispatch = (message: string): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  dispatch(sendExample.action(message));
};
