import React, { useEffect, useState } from 'react';
import { AppAction } from '../ducks/actions';
import { AppState } from '../ducks/reducer';

interface Store {
  dispatch: (action: AppAction) => void;
  getState: () => AppState;
  subscribe: (listener: () => void) => () => void;
}

const quaxContext = React.createContext<Store | undefined>(undefined);

interface QuaxProviderProps {
  store: Store;
  children: React.ReactNode;
}

export const QuaxProvider: React.FC<QuaxProviderProps> = ({ store, children }) => {
  return <quaxContext.Provider value={store}>{children}</quaxContext.Provider>;
};

export const useQuaxStore = () => {
  const store = React.useContext(quaxContext);
  if (!store) {
    throw new Error('useQuaxStore must be used within QuaxProvider');
  }
  return store;
};

export const useQuaxDispatch = () => {
  const { dispatch } = useQuaxStore();
  return dispatch;
};

export const useQuaxSelector = <T,>(selector: (state: AppState) => T): T => {
  const store = useQuaxStore();
  const [value, setValue] = useState(() => selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setValue(selector(store.getState()));
    });
    return unsubscribe;
  }, [store, selector]);

  return value;
};
