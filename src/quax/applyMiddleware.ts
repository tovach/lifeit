const compose = (fns: Function[]) =>
  fns.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  );

export const applyMiddleware =
  (...middlewares: any) =>
  (createStore: any) =>
  (reducer: any) => {
    const store = createStore(reducer);
    let dispatch: any = () => {};

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action: any, ...args: any[]) => dispatch(action, ...args),
    };

    const chain = middlewares.map((middleware: any) =>
      middleware(middlewareAPI)
    );
    dispatch = compose(chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
