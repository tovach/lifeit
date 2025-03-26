export const createStore: any = (reducer: any, enhancer?: any) => {
  if (enhancer !== undefined) {
    return enhancer(createStore)(reducer);
  }

  let currentReducer = reducer;
  let currentState = reducer(undefined, {});
  let currentListeners: Map<number, () => void> | null = new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;

  return {
    subscribe(listener: () => void) {
      let isSubscribed = true;

      if (nextListeners === currentListeners) {
        nextListeners = new Map();
        currentListeners.forEach((listener, key) => {
          nextListeners.set(key, listener);
        });
      }

      const listenerId = listenerIdCounter++;
      nextListeners.set(listenerId, listener);

      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }

        isSubscribed = false;

        if (nextListeners === currentListeners) {
          nextListeners = new Map();
          currentListeners.forEach((listener, key) => {
            nextListeners.set(key, listener);
          });
        }
        nextListeners.delete(listenerId);
        currentListeners = null;
      };
    },
    dispatch(action: any) {
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }

      const listeners = (currentListeners = nextListeners);
      listeners.forEach((listener) => {
        listener();
      });
      return action;
    },
    getState() {
      return currentState;
    },
  };
};
