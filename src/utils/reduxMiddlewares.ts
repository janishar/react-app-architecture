/**
 * Logs all actions and states after they are dispatched.
 */
const LOGGING = process.env.NODE_ENV !== 'production' && process.env.LOGGING == 'true';

export const logger = (store: any) => (next: any) => (action: any) => {
  if (LOGGING) {
    console.group(action.type);
    console.info('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
};

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
export const crashReporter = () => (next: any) => (action: any) => {
  if (LOGGING) {
    try {
      return next(action);
    } catch (err) {
      console.error('Caught an exception!', err);
      // Raven.captureException(err, {
      //   extra: {
      //     action,
      //     state: store.getState()
      //   }
      // })
      throw err;
    }
  }
  return next(action);
};

/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 */
export const timeoutScheduler = () => (next: any) => (action: any) => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  const timeoutId = setTimeout(() => next(action), action.meta.delay);

  return function cancel() {
    clearTimeout(timeoutId);
  };
};

/**
 * Schedules actions with { meta: { raf: true } } to be dispatched inside a rAF loop
 * frame.  Makes `dispatch` return a function to remove the action from the queue in
 * this case.
 */
export const rafScheduler = () => (next: any) => {
  let queuedActions: any[] = [];
  let frame: number | null = null;

  function loop() {
    frame = null;
    try {
      if (queuedActions.length) {
        next(queuedActions.shift());
      }
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      maybeRaf();
    }
  }

  function maybeRaf() {
    if (queuedActions.length && !frame) {
      frame = requestAnimationFrame(loop);
    }
  }

  return (action: any) => {
    if (!action.meta || !action.meta.raf) {
      return next(action);
    }

    queuedActions.push(action);
    maybeRaf();

    return function cancel() {
      queuedActions = queuedActions.filter((a) => a !== action);
    };
  };
};

/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
export const vanillaPromise = (store: any) => (next: any) => (action: any) => {
  if (typeof action.then !== 'function') {
    return next(action);
  }

  return Promise.resolve(action).then(store.dispatch);
};

/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
export const readyStatePromise = () => (next: any) => (action: any) => {
  if (!action.promise) {
    return next(action);
  }

  function makeAction(ready: any, data: any) {
    const newAction = Object.assign({}, action, { ready }, data);
    delete newAction.promise;
    return newAction;
  }

  next(makeAction(false, null));
  return action.promise.then(
    (result: any) => next(makeAction(true, { result })),
    (error: any) => next(makeAction(true, { error })),
  );
};

/**
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 *
 * Useful for early exits (conditions over `getState()`), as well
 * as for async control flow (it can `dispatch()` something else).
 *
 * `dispatch` will return the return value of the dispatched function.
 */
export const thunk = (store: any) => (next: any) => (action: any) =>
  typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);
