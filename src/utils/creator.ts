import { Action } from 'app-types';
import { NetworkResponse } from '@utils/network';

export function actionCreator<T>(actionType: string) {
  interface SingleAction extends Action {
    readonly type: typeof actionType;
    readonly payload?: T;
  }

  const actionGenerator = (data?: T): SingleAction => ({
    type: actionType,
    payload: data,
  });

  type ActionWrapper = {
    readonly type: typeof actionType;
    readonly action: (data?: T) => SingleAction;
  };

  const actionWrapper: ActionWrapper = {
    type: actionType,
    action: actionGenerator,
  };

  return actionWrapper;
}

export function networkActionsCreator<T extends object | null>(actionType: string) {
  const requesting = actionType + '_REQUESTING';
  const success = actionType + '_SUCCESS';
  const failure = actionType + '_FAILURE';

  interface RequestingAction extends Action {
    readonly type: typeof requesting;
  }

  interface SuccessAction extends Action {
    readonly type: typeof success;
    readonly payload: NetworkResponse<T>;
  }

  interface FailureAction extends Action {
    readonly type: typeof failure;
    readonly payload: NetworkResponse<null>;
  }

  const requestingActionGenerator = (): RequestingAction => ({
    type: requesting,
  });

  const successActionGenerator = (response: NetworkResponse<T>): SuccessAction => ({
    type: success,
    payload: response,
  });

  const failureActionGenerator = (response: NetworkResponse<null>): FailureAction => ({
    type: failure,
    payload: response,
  });

  type RequestActionWrapper = {
    readonly type: typeof requesting;
    readonly action: () => RequestingAction;
  };

  type SuccessActionWrapper = {
    readonly type: typeof success;
    readonly action: (response: NetworkResponse<T>) => SuccessAction;
  };

  type FailureActionWrapper = {
    readonly type: typeof requesting;
    readonly action: (response: NetworkResponse<null>) => FailureAction;
  };

  type ActionWrappers = {
    readonly requesting: RequestActionWrapper;
    readonly success: SuccessActionWrapper;
    readonly failure: FailureActionWrapper;
  };

  const actionWrappers: ActionWrappers = {
    requesting: {
      type: requesting,
      action: requestingActionGenerator,
    },
    success: {
      type: success,
      action: successActionGenerator,
    },
    failure: {
      type: failure,
      action: failureActionGenerator,
    },
  };

  return actionWrappers;
}
